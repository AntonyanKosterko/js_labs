window.onload = function() {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let accumulator = 0;
    const outputElement = document.getElementById('result');
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
  
    function refreshOutput(value) {
      outputElement.innerHTML = value;
    }
  
    function onDigitButtonClicked(digit) {
      if (!selectedOperation) {
        if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
          a += digit;
        }
        refreshOutput(a);
      } else {
        if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
          b += digit;
        }
        refreshOutput(b);
      }
    }
  
    digitButtons.forEach(button => {
      button.onclick = function() {
        const digitValue = button.innerHTML;
        onDigitButtonClicked(digitValue);
      };
    });
  
    document.getElementById('btn_op_clear').onclick = function() {
      a = '';
      b = '';
      selectedOperation = null;
      expressionResult = '';
      refreshOutput('0');
    };
  
    document.getElementById('btn_op_backspace').onclick = function() {
      if (!selectedOperation) {
        if (a.length > 0) {
          a = a.slice(0, -1);
          refreshOutput(a || '0');
        }
      } else {
        if (b.length > 0) {
          b = b.slice(0, -1);
          refreshOutput(b || '0');
        }
      }
    };
  
    document.getElementById('btn_op_sqrt').onclick = function() {
      if (!selectedOperation) {
        if (a !== '') {
          a = Math.sqrt(parseFloat(a)).toString();
          refreshOutput(a);
        }
      } else {
        if (b !== '') {
          b = Math.sqrt(parseFloat(b)).toString();
          refreshOutput(b);
        }
      }
    };
  
    document.getElementById('btn_op_square').onclick = function() {
      if (!selectedOperation) {
        if (a !== '') {
          a = Math.pow(parseFloat(a), 2).toString();
          refreshOutput(a);
        }
      } else {
        if (b !== '') {
          b = Math.pow(parseFloat(b), 2).toString();
          refreshOutput(b);
        }
      }
    };
  
    document.getElementById('btn_op_factorial').onclick = function() {
      function factorial(n) {
        if (n < 0) return 'ERR';
        let result = 1;
        for (let i = 1; i <= n; i++) {
          result *= i;
        }
        return result.toString();
      }
      if (!selectedOperation) {
        if (a !== '') {
          let numA = parseInt(a);
          a = factorial(numA);
          refreshOutput(a);
        }
      } else {
        if (b !== '') {
          let numB = parseInt(b);
          b = factorial(numB);
          refreshOutput(b);
        }
      }
    };
  
    document.getElementById('btn_op_tripleZero').onclick = function() {
      if (!selectedOperation) {
        a += '000';
        refreshOutput(a);
      } else {
        b += '000';
        refreshOutput(b);
      }
    };
  
    document.getElementById('btn_op_accAdd').onclick = function() {
      let currentValue = 0;
      if (!selectedOperation) {
        currentValue = parseFloat(a || '0');
        a = '';
      } else {
        currentValue = parseFloat(b || '0');
        b = '';
      }
      accumulator += currentValue;
      refreshOutput(accumulator.toString());
    };
  
    document.getElementById('btn_op_accSub').onclick = function() {
      let currentValue = 0;
      if (!selectedOperation) {
        currentValue = parseFloat(a || '0');
        a = '';
      } else {
        currentValue = parseFloat(b || '0');
        b = '';
      }
      accumulator -= currentValue;
      refreshOutput(accumulator.toString());
    };
  
    document.getElementById('btn_op_prob').onclick = function() {
        let x = parseInt(a);
        if (isNaN(x)) {
          refreshOutput('Введите корректное число');
          return;
        }
        if (x < 2 || x > 12) {
          refreshOutput('Сумма двух кубиков может быть от 2 до 12');
          return;
        }
      
        let ways = 0;
        for (let d1 = 1; d1 <= 6; d1++) {
          for (let d2 = 1; d2 <= 6; d2++) {
            if (d1 + d2 === x) {
              ways++;
            }
          }
        }
      
        let probability = ways / 36;
      
        refreshOutput(probability.toString());
        // a = probability.toString();
      };
  
    document.getElementById('btn_op_resColor').onclick = function() {
      outputElement.classList.toggle('res-alt');
    };
  
    document.getElementById('btn_op_individual').onclick = function() {
      function reciprocal(x) {
        if (x === 0) return 'ERR';
        return (1 / x).toString();
      }
      if (!selectedOperation) {
        if (a !== '') {
          a = reciprocal(parseFloat(a));
          refreshOutput(a);
        }
      } else {
        if (b !== '') {
          b = reciprocal(parseFloat(b));
          refreshOutput(b);
        }
      }
    };
  
    document.getElementById('btn_op_mult').onclick = function() {
      if (a === '') return;
      selectedOperation = 'x';
    };
    document.getElementById('btn_op_plus').onclick = function() {
      if (a === '') return;
      selectedOperation = '+';
    };
    document.getElementById('btn_op_minus').onclick = function() {
      if (a === '') return;
      selectedOperation = '-';
    };
    document.getElementById('btn_op_div').onclick = function() {
      if (a === '') return;
      selectedOperation = '/';
    };
  
    document.getElementById('btn_op_equal').onclick = function() {
      if (a === '' || b === '' || !selectedOperation) return;
      switch (selectedOperation) {
        case 'x':
          expressionResult = (+a) * (+b);
          break;
        case '+':
          expressionResult = (+a) + (+b);
          break;
        case '-':
          expressionResult = (+a) - (+b);
          break;
        case '/':
          expressionResult = (+a) / (+b);
          break;
      }
      a = expressionResult.toString();
      b = '';
      selectedOperation = null;
      refreshOutput(a);
    };
  };
  