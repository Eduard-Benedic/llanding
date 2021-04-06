<?

class validation {

	public $modx 		= null;
	public $fields 		= array();
	public $output 		= array();
	public $valid 		= array();
	public $errors 		= array();
	private $ignore 	= null;
	private $rulelist 	= array();

	function __construct() {
		$this->ignore = 0;
		$this->regex = array(
			'letters'		=> "[^A-Za-z]",
			'alpha'			=> "[^A-Za-z-\'[:space:]]",
			'alphanum'  	=> "[^A-Za-z0-9-'\[:space:]]",
			'user'  		=> "[^A-Za-z0-9\.\-@\']",
			'numbers'   	=> "[^0-9]",
			'spalpha'		=> "[^[:space:]A-Za-z]",
			'spalphanum'  	=> "[^[:space:]A-Za-z0-9]",
			'date'			=> "[^-0-9\/]",
            'name'          => "[^-[:space:]A-Za-z\'\.\&\\\\]",
            'basicpunc'     => "[^-[:space:]A-Za-z0-9\-.,'\?']",
            'phone'         => "[^-[0-9][:space:]\+\(\)$/]",
		);

	}

	public function validateSingle($field,$config) {
		$arr = array_keys($config);
		$fields = array($arr[0] => $field);
		$output = $this->validate($fields,$config);
		return $output;
	}

	public function validate($fields,$config) {
		unset($this->valid);
		unset($this->rulelist);
		$this->errors = array();
		$this->config = $config;
		if (is_array($fields)) {
			$this->fields = $fields;
		}
		foreach ($this->config as $key => $rules) {
			$this->fields[$key] = strip_tags($this->fields[$key]);
			$this->fields[$key] = rtrim($this->fields[$key]);
			if (is_array($rules)) {
				foreach ($rules as $k => $ruledata) {
					$this->rulelist[$key][] = $ruledata;
				}
			}
		}
		$this->_processValidations();
		$output = $this->_processOutput();
		return $output;
	}

	private function _processValidations() {
		if (!empty($this->rulelist)) {
			foreach ($this->rulelist as $key => $rulearray) {
				switch ($rulearray[0]) {
					case 'required':
						$result = $this->{$rulearray[0]}($key);
						if ($result !== true) {
							$this->addError($key,$result);
						}
						break;
					case 'optional':
						$result = $this->{$rulearray[0]}($key);
						if ($result !== true) {
							unset($rulearray);
						}
						break;
				}
				unset($rulearray[0]);
				if (!empty($rulearray)) {
					foreach($rulearray as $ruledata) {
						$validated = false;
						$pos = strpos($ruledata,':');
						$params = '';
						if ($pos) {
							$rule = substr($ruledata,0,$pos);
							$params = substr($ruledata,$pos+1,strlen($ruledata));
						} else {
							$rule = $ruledata;
						}
						if (method_exists($this,$rule)) {
							$validated = $this->{$rule}($key,$params);
							if ($validated !== true) {
								$this->addError($key,$validated);
							}
						}
					}
				}
			}
		}
	}

	private function _processOutput() {
		if (empty($this->errors)) {
			foreach ($this->fields as $key => $value) {
				//if (count($this->errors[$key]) == 0 && !empty($this->config[$key])) {
				if (!empty($this->config[$key])) {
					$this->valid[$key] = $value;
				}
			}
			$output = $this->valid;
		} else {
			$output = array('error' => $this->errors);
		}
		return $output;
	}


   	public function regEx($key,$params = array()) {
       if (array_key_exists($params,$this->regex)) {
        	if (preg_match('/'.$this->regex[$params].'/i',$this->fields[$key])) {
            	return 'incorrect format';
        	}
        } else {
        	if (preg_match('/[^'.$params.']/i',$this->fields[$key])) {
            	return 'incorrect format';
        	}
        }
        return true;
    }

    public function equalTo($key,$params = array()) {
        if ($this->fields[$key] != $this->fields[$params]) {
            return 'no match';
        }
        return true;
    }

    public function optional($key) {
        return empty($this->fields[$key]) ? false : true;
    }
		
    public function isSafe($key,$params = array()) {
	    if (filter_var($this->fields[$key],FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>'/[!@#$^*=?":{}|<>]/i')))) {
			return 'invalid chars';			
		}
		return true;
    }

    public function isUrl($key,$params = array()) {
        if (filter_var($this->fields[$key], FILTER_VALIDATE_URL)) {
			return true;
		}
		return 'invalid url';
    }	
	
    public function required($key) {
        $result = false;
        $result = !empty($this->fields[$key]) ? true : false;
        return $result ? true : 'missing field';
    }

	public function isEnum($key, $params = array()) {
		if (!empty($params)) {
			$opts = explode(',',$params);
			if (!in_array($this->fields[$key],$opts)) {
				return 'invalid enum';
			}
			return true;
		}
	}
	
    public function isDigits($key, $params = array()) {
        if ((is_int($this->fields[$key]) && $this->fields[$key] >= 0) || ctype_digit($this->fields[$key])) {
			return true;
		}
		return 'not digits';
    }
	
    public function isDecimal($key, $params = array()) {
        if (preg_match('/^[+-]?[0-9]+[,\.][0-9]{' . ((int) $params[0]) . '}$/D', $this->fields[$key])) {
			return true;
		} else {
			return 'invalid decimal';
		}
    }
	
    public function creditCard($key, $params = array()) {
        $value = preg_replace('/\D+/', '',  $this->fields[$key]);
        if (self::luhn($value)) {
			return true;
		}
		return 'invalid';
    }

    public function luhn($input) {
        if (!ctype_digit($input)) {
            return FALSE;
        }
        $checksum = '';
        foreach (str_split(strrev($input)) as $i => $d) {
            $checksum .= $i % 2 !== 0 ? $d * 2 : $d;
        }
        return array_sum(str_split($checksum)) % 10 === 0;
    }

    public function isNumeric($key,$params = '') {
        if (!is_numeric($this->fields[$key])) {
            return 'not numeric';
        }
        return true;
	}

    public function isEmail($key,$params = array()) {
		if (empty($this->fields[$key])) return true;		
		if (filter_var($this->fields[$key], FILTER_VALIDATE_EMAIL)) {
			return true;
		}
		return 'invalid email';
    }

	private function addError($key,$error) {
		$this->errors[$key][] = $error;
		return $this->errors;
	}

}

?>