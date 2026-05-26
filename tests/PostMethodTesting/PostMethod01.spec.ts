import { test, expect } from "@playwright/test";

test("POST Request Using Static Body", async ({ request }) => {

    //requestBody Formation
    const requestBody =
    {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
    }

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

    expect(booking).toMatchObject(
        {
            firstname: "Jim",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            additionalneeds: "Breakfast"
        }
    )

    expect(booking.bookingdates).toMatchObject(
        {
            checkin: "2018-01-01",
            checkout: "2019-01-01"
        }
    )

})