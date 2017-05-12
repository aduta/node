function DelayedGreeter(name) {
    this.name = name;
}

DelayedGreeter.prototype.greet = function() {
    setTimeout( function cb() {
        console.log('Hello ' + this.name);
    }, 500);
};

const greeter = new DelayedGreeter('World');
greeter.greet(); // will print "Hello undefined"

DelayedGreeter.prototype.arrow = function() {
    setTimeout(() => console.log("Hello " + this.name + " from arrow"), 500);
}

greeter.arrow();