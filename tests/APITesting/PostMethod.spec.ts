import { test, expect} from "@playwright/test";

test("POST Request Using Static Body", async ({ request }) => {

    //requestBody Formation
    const requestBody =
    {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }

    //Sending Post Request
    const response = await request.post("https://restful-booker.herokuapp.com/booking",{data:requestBody});
    const responseBody=await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("bookingid");
})