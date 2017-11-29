
// Coerce function input
// ex. hubot plugin

// see hubot.d.ts
import { Robot } from './hubot'

module.exports = (robot: Robot) => {
  robot.respond(/hello\s+(\w+)/i, (res) => {

    const name = res.match[1]
    res.reply(`Hi ${name}!`)
    res.emote(":)")
  })
}

// Coerce data objects
// ex. parsing API response

interface IEntriesResponse {
  limit: number,
  skip: number,
  total: number,
  entries: Array<{
    id: string,
    name: string,
    text: string,
    link: string,
    price: number
  }>
}

let respBody = "..."
const resp = JSON.parse(respBody) as IEntriesResponse

console.log("Does not compile:", resp.unknown_field)

// Typescript prevents invalid casts

interface ICustomersResponse {
  limit: number,
  skip: number,
  total: number,
  customers: Array<{
    id: string,
    name: string,
    address: string,
    link: string,
    latestPurchase: Date
  }>
}

const customerResp: ICustomersResponse = {
  limit: 10, skip: 0, total: 10,
  customers: [{id: "1", name:"Bob", address: "404", link: "/customers/1", latestPurchase: null}]
}

let entriesResp = customerResp as IEntriesResponse  // does not compile
entriesResp = <IEntriesResponse>customerResp // does not compile

function doWithEntriesResponse(resp: IEntriesResponse) {}

doWithEntriesResponse(customerResp as IEntriesResponse) // does not compile

// but you can force it if you're really sure.
// DON'T DO THIS!  This is a recipe for null refs.

doWithEntriesResponse(customerResp as any)

// Typescript is smart though, you can cast something that has
// the same properties even if it's not the same type.  This is
// called "structural typing"

type OtherApiAddress = string

interface IOtherApiCustomer {
  id: string,
  name: string,
  address: OtherApiAddress
  link: string
  latestPurchase: Date
}

const fromOtherApi = JSON.parse("response body") as IOtherApiCustomer
fromOtherApi.link = "www.other.com/api/customer/3"

customerResp.customers.push(fromOtherApi) //compiles