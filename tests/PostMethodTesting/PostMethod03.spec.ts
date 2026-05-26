import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon';

test("POST Request Using Faker Library", async ({ request }) => {

    //requestBody Formation
    //const requestBody = await import("../../testdata/post_request_body.json");

    //Sending Post Request

    const firstname = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalprice = faker.number.int({ min: 100, max: 5000 });
    const depositpaid = faker.datatype.boolean();

    const checkindate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkoutdate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

    const additionalneeds = "super bowls";

    const requestBody = {
        firstname: firstname,
        lastname: lastName,
        totalprice: totalprice,
        depositpaid: depositpaid,
        bookingdates: {
            checkin: checkindate, //yyyy-mm-dd
            checkout: checkoutdate,
        },
        additionalneeds: additionalneeds,
    }



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