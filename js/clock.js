/**
 * Created by lu on 2017/2/11.
 */
function Clock(obj) {
    for (key in obj) {
        this[key] = obj[key];
    }
    this.lineWidth = this.bigRadius / 20;
    this.draw();
}
Clock.prototype = {
    constructor: Clock,
    /**
     * 入口函数
     */
    draw: function () {
        var self = this;
        self.date = new Date();
        self.drawClockCircle();
        self.drawClockDials();
        self.drawClockHand();
        var timer = setInterval(function () {
            self.date = new Date();
            self.ctx.clearRect(0, 0, canvas.width, canvas.height);
            self.drawClockCircle();
            self.drawClockDials();
            self.drawClockHand();
        }, 1000);
    },
    /**
     * 绘制表盘外圈形状
     */
    drawClockCircle: function () {
        var _ctx = this.ctx;
        _ctx.save();
        _ctx.beginPath();
        _ctx.arc(this.bigX, this.bigY, this.bigRadius, 0, 2 * Math.PI);
        _ctx.strokeStyle = "blue";
        _ctx.lineWidth = this.lineWidth;
        _ctx.stroke();
        _ctx.restore();
    },
    /**
     * 绘制表盘刻度
     * @param radian 每一个刻度的弧度
     * @param lineWidth 刻度线的宽度
     * @param lineLength 刻度线的长度
     */
    drawClockDial: function (radian, lineWidth, lineLength) {
        var _ctx = this.ctx;
        var h1 = Math.sin(radian) * (this.bigRadius - this.lineWidth / 2);
        var b1 = Math.cos(radian) * (this.bigRadius - this.lineWidth / 2);
        var h2 = Math.sin(radian) * (this.bigRadius - this.lineWidth / 2 - lineLength);
        var b2 = Math.cos(radian) * (this.bigRadius - this.lineWidth / 2 - lineLength);
        _ctx.save();
        _ctx.beginPath();
        _ctx.moveTo(this.bigX + b1, this.bigY + h1);
        _ctx.lineTo(this.bigX + b2, this.bigY + h2);
        _ctx.lineWidth = lineWidth;
        _ctx.strokeStyle = "black";
        _ctx.stroke();
        _ctx.restore();
    },
    /**
     * 绘制全部刻度线
     */
    drawClockDials: function () {
        var startRadian = -Math.PI / 3;
        var everyRadian = Math.PI / 30;
        for (var i = 0; i < 60; i++) {
            if (i % 5 == 0) {
                var lineWidth = this.bigRadius / 40;
                var lineLength = this.bigRadius / 10;
                this.drawClockNum(i / 5 + 1, startRadian + everyRadian * i, lineLength);
            } else {
                var lineWidth = this.bigRadius / 80;
                var lineLength = this.bigRadius / 20;
            }
            this.drawClockDial(startRadian + everyRadian * i, lineWidth, lineLength);
        }
    },
    /**
     * 绘制表盘文字
     * @param 输入的文字
     * @param 每个文字位置对应的弧度
     * @param 刻度的长度，用来确定绘制文字位置
     */
    drawClockNum: function (num, radian, lineLength) {
        var _ctx = this.ctx;
        _ctx.save();
        _ctx.beginPath();
        var h = Math.sin(radian) * (this.bigRadius - this.lineWidth / 2 - lineLength - this.bigRadius / 10);
        var b = Math.cos(radian) * (this.bigRadius - this.lineWidth / 2 - lineLength - this.bigRadius / 10);
        _ctx.fillStyle = "red";
        _ctx.textAlign = "center";
        _ctx.textBaseline = "middle";
        _ctx.font = this.bigRadius / 4+ "px French Script MT";
        _ctx.fillText(num, this.bigX + b, this.bigY + h);
        _ctx.stroke();
        _ctx.restore();
    },
    drawHand: function (cardinal, time, color, length, width) {
        var _ctx = this.ctx;
        var startRadian = -Math.PI / 2;
        var h = Math.sin(startRadian + 2 * Math.PI / cardinal * time) * (length);
        var b = Math.cos(startRadian + 2 * Math.PI / cardinal * time) * (length);
        _ctx.save();
        _ctx.beginPath();
        _ctx.moveTo(this.bigX, this.bigY);
        _ctx.lineTo(this.bigX + b, this.bigY + h)
        _ctx.strokeStyle = color;
        _ctx.lineCap = "round";
        _ctx.lineWidth = width;
        _ctx.stroke();
        _ctx.restore();
    },
    drawClockHand: function () {
        var second = this.date.getSeconds();
        var minuteSeconds = this.date.getMinutes() * 60;
        var hourSeconds = this.date.getHours() * 60 * 60;
        this.drawHand(12 * 60 * 60, hourSeconds + minuteSeconds + second, "black", this.bigRadius - this.bigRadius / 1.5, this.bigRadius / 25);
        this.drawHand(60 * 60, minuteSeconds + second, "black", this.bigRadius - this.bigRadius / 2, this.bigRadius / 40);
        this.drawHand(60, second, "red", this.bigRadius - this.bigRadius / 3, this.bigRadius / 80);
    }
}
