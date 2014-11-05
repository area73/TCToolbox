/**
* @file Returns name and last name.
* @author Kike Sobrinus [enrique.sobrino@the-cocktail.com]
* @version 1.2.3
*/

/**
* Check out {@tutorial tutorial-1} and {@tutorial tutorial-2}.
*
* @param {string} name - The name of the dude.
* @param {string} lastName - The last name of the dude.
* 
* @example
* // returns Emmanuel Goldstein
* sayHello("Emmanuel", "Goldstein");
* @returns {String|Array} The complete name of the dude
*/
function sayHello(name, lastName){
  return name + " " + lastName;
}

/** @function */
var paginate = paginateFactory(pages);

/**
 * A variable in the global namespace called 'foo'.
 * @type {number}
 */
var foo;



// We want to document this as being a class
/**
 * @file Creates a new Person.
 */
var Person = makeClass(
	// We want to document these as being methods
	// Lending the methods to the class's prototype
  /** @lends Person.prototype */
  {
    /** @constructs */
    initialize: function(name) {
        this.name = name;
    },
    /** Describe me. */
    say: function(message) {
        return this.name + " says: " + message;
    }
  }
);

var p = new Person();

/**
 * @deprecated since version 2.0
 */
function old() {
}

/**
 * @throws {DivideByZero} Argument x must be non-zero.
 */
function baz(x) {}

/**
 * An optional parameter and default value
 * Allows one type OR another type (type union)
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    } else if (Array.isArray(somebody)) {
        somebody = somebody.join(', ');
    }
    alert('Hello ' + somebody);
}


/**
 * Allows a parameter to be repeated
 * Returns the sum of all numbers passed to the function.
 * @param {...number} num - A positive or negative number.
 */
function sum(num) {
    var i = 0, n = arguments.length, t = 0;
    for (; i < n; i++) {
        t += arguments[i];
    }
    return t;
}



