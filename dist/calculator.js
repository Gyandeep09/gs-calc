"use strict";
class GCalculator {
    constructor(displayId) {
        this.currentInput = '';
        this.displayElement = document.getElementById(displayId);
    }
    appendNumber(num) {
        if (this.currentInput.length > 12)
            return;
        this.currentInput += num;
        this.updateDisplay();
    }
    appendOperator(op) {
        if (!this.currentInput)
            return;
        const lastChar = this.currentInput.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            this.currentInput = this.currentInput.slice(0, -1) + op;
        }
        else {
            this.currentInput += op;
        }
        this.updateDisplay();
    }
    clear() {
        this.currentInput = '';
        this.updateDisplay('0');
    }
    calculate() {
        try {
            if (!this.currentInput)
                return;
            // Basic evaluation for showcase purposes
            const result = new Function('return ' + this.currentInput)();
            this.currentInput = String(Number.isInteger(result) ? result : parseFloat(result.toFixed(4)));
            this.updateDisplay();
        }
        catch (e) {
            this.updateDisplay('ERR');
            this.currentInput = '';
        }
    }
    updateDisplay(val) {
        if (this.displayElement) {
            this.displayElement.innerText = val || this.currentInput || '0';
        }
    }
}
// Initialize calculator on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const calc = new GCalculator('display');
    // Expose to window for inline onclick handlers
    window.calc = calc;
});
