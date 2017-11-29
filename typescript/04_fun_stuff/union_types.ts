import * as React from 'react'

/*
 * Type unions are super cool!  There's two kinds of sets of types,
 * 1. a type Union (|) allows the value to be one of any of the types in the union.
 * 2. a type Intersection (&) combines multiple types into one.
 */

function toNumber(a: number | string) {
  if (typeof a === 'string') {
     // compiles because Typescript figured out that a is a string
     // within the block
    a = parseInt(a)
  }
  return a
}

abstract class Animal {
}
class Cat extends Animal {
  meow() {
    return "Meow!"
  }
  speak(){ return this.meow() }
}
class Dog extends Animal {
  woof() {
    return "Woof!"
  }
  speak(){ return this.woof() }
}
class Seagull extends Animal {
  sqwawk(): string {
    return "Sqwawk!"
  }
  speak(){ return this.sqwawk() }
}

let arrayOfAnimals: Array<Animal> = []
let arrayOfCatsOrDogs: Array<Cat | Dog> = []

// compiles
arrayOfAnimals.push(new Cat(), new Dog(), new Seagull())
arrayOfCatsOrDogs.push(new Cat(), new Dog())

// does not compile
arrayOfCatsOrDogs.push(new Seagull())
arrayOfCatsOrDogs[0].sqwawk()

/*
 * AND (&) Union types enable mixins!
 */

interface IMyComponentProps {
  prop1: string
}

class MyComponent extends React.Component<IMyComponentProps & ILoginMixinProps, { data: string[] } & ILoginMixinState> 
  implements LoginMixin {

  mixins: [
    LoginMixin
  ]

    // this gets replaced by the LoginMixin when the applyMixins function runs
  login: (loginOption?: "option1" | "option2") => void

  componentDidMount() {
    if (!this.state.loggedIn) {
      console.log('logging in to ', this.props.loginUrl)
      this.login()
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return '<h3>You must log in!</h3>'
    }

    return this.state.data.map((val) => `<li>${val}</li>`)
  }
}

interface ILoginMixinProps {
  loginUrl: string
}

interface ILoginMixinState {
  loggedIn: boolean
  loggedInUser: {
    name: string,
    id: string,
    logoutUrl: string
  }
}

class LoginMixin extends React.Component<IMyComponentProps & ILoginMixinProps, {} & ILoginMixinState>  {
  login(loginOption?: "option1" | "option2") {
    // do login
  }
}

// this has to happen b/c Javascript needs to copy over the method declarations.
// (React takes care of this if you set the mixins property)
applyMixins(MyComponent, [LoginMixin])

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
  });
}

// There's a post out there pointing out why mixins are bad.  As I read through it,
// everything they say is bad about mixins is solved by Typescript.  So let's use em!
// https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html