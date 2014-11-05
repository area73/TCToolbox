/**
* This is a description of the sayHello function.
* @param {string} name - The name of the dude.
* @param {string} lastName - The last name of the dude.
* @returns {String|Array} The complete name of the dude
* @example
* returns Sergio Ramirez
* sayHello("Sergio", "Ramirez");
*
*
* @file This is a description of the sayHello function 2.
* @author Kike Sobrinus [enrique.sobrino@the-cocktail.com]
* @version 1.2.3
* @tutorial solver
*/
function sayHello(name, lastName){
  return name + " " + lastName
}


// We want to document this as being a class
/**
 * Creates a new Person.
 * @class
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