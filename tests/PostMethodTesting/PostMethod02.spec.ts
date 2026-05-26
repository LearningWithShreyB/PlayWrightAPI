import { test, expect } from "@playwright/test";
//import * as fs from 'fs';
//import requestBody from "../../testdata/post_request_body.json" with { type: "json" };
import requestBody from "../../testdata/post_request_body.json"// with { type: "json" };

test("POST Request Using JSON File", async ({ request }) => {

    //requestBody Formation
    //const requestBody = await import("../../testdata/post_request_body.json");

    //Sending Post Request
    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.firstname");


    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

    //validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout,
    });

})