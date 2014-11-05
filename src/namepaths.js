/*************************************************************************************/
/* Basic Syntax Examples of Namepaths in JSDoc 3 */
/*************************************************************************************/
/* myFunction
 * MyConstructor
 * MyConstructor#instanceMember
 * MyConstructor.staticMember
 * MyConstructor~innerMember // note that JSDoc 2 uses a dash
 */


/*************************************************************************************
The example below shows: an instance method named "say," an inner function also named "say," and a static method also named "say." These are three distinct methods that all exist independently of one another.
*************************************************************************************/
/** @constructor */
Person = function() {
    this.say = function() {
        return "I'm an instance.";
    }

    function say() {
        return "I'm inner.";
    }
}
Person.say = function() {
    return "I'm static.";
}

var p = new Person();
p.say();      // I'm an instance.
Person.say(); // I'm static.
// there is no way to directly access the inner function from here


/*************************************************************************************/
/* You would use three different namepath syntaxes to refer to the three different methods */
/*************************************************************************************/
/* Person#say  // the instance method named "say."
 * Person.say  // the static method named "say."
 * Person~say  // the inner method named "say."
 */


/*************************************************************************************
Note that if a constructor has an instance member that is also a constructor, you can simply chain the namepaths together to form a longer namepath
*************************************************************************************/
/** @constructor */
Person = function() {
    /** @constructor */
    this.Idea = function() {
        this.consider = function(){
            return "hmmm";
        }
    }
}

var p = new Person();
var i = new p.Idea();
i.consider();
/* In this case, to refer to the method named "consider," you would use the following namepath: Person#Idea#consider */


/*************************************************************************************
Special cases: modules, externals and events.
*************************************************************************************/
/** A module. Its name is module:foo/bar.
 * @module foo/bar
 */
/** The built in string object. Its name is external:String.
 * @external String
 */
/** An event. Its name is module:foo/bar.event:MyEvent.
 * @event module:foo/bar.event:MyEvent
 */
