export class Todos {
    private _totalAN: any;
    private _totalJN: number;
    private _totalCA: number;
    private _totalAE: number;
    private _totalJE: number;
    private _totalCE: number;


    constructor(
        _totalAN: any,
        _totalJN: number,
        _totalCA: number,
        _totalAE: number,
        _totalJE: number,
        _totalCE: number,

    ) {
        this._totalAN = _totalAN;
        this._totalJN = _totalJN;
        this._totalCA = _totalCA;
        this._totalAE = _totalAE;
        this._totalJE = _totalJE;
        this._totalCE = _totalCE;
    }

    get totalAN() {
        return this._totalAN;
    }

    get totalJN() {
        return this._totalJN;
    }

    get totalCA() {
        return this._totalCA;
    }

    get totalAE() {
        return this._totalAE;
    }

    get totalJE() {
        return this._totalJE;
    }

    get totalCE() {
        return this._totalCE;
    }
}