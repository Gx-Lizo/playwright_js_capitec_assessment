import { test, expect } from "@playwright/test";
import users from "../../data/users.json" with { type: "json" };
import { booking_api_controller } from "../../controller/booking_api_controller";

test.describe("Booking api test", async () => {
  const bookingApiController = new booking_api_controller();

  test("Test post booking auth request", async ({ request }) => {
    const response = await request.post("/auth", {
      data: users.api,
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(await responseBody).toHaveProperty("token");
    expect(await responseBody.token).not.toBeNull();
    bookingApiController.token = await responseBody.token;
    bookingApiController.updateCookie();
  });

  test("Test get booking request", async ({ request }) => {
    const response = await request.get("/booking");
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody[0].bookingid).not.toBeNull();
    expect(responseBody[0]).toHaveProperty("bookingid");
    bookingApiController.booking_id = await responseBody[0].bookingid;
  });

  test("Test get by id booking request", async ({ request }) => {
    const response = await request.get(
      `/booking/${bookingApiController.booking_id}`,
    );
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    for (let key of bookingApiController.bookingDataKeys) {
      expect(responseBody).toHaveProperty(key);
    }
  });

  test("Test post booking request", async ({ request }) => {
    const response = await request.post("/booking", {
      data: bookingApiController.createBooking,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(await responseBody).toHaveProperty("bookingid");
    expect(await responseBody.bookingid).not.toBeNull();
    expect(await responseBody.booking).toMatchObject(
      bookingApiController.createBooking,
    );
    bookingApiController.getBookingInfo(await responseBody);
  });

  test("Test put booking request", async ({ request }) => {
    bookingApiController.createBooking.firstname = "Gerrie";
    bookingApiController.createBooking.lastname = "Fourie";
    const response = await request.put(
      `/booking/${bookingApiController.data.bookingid}`,
      {
        headers: bookingApiController.headers,
        data: bookingApiController.createBooking,
      },
    );

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(await responseBody.firstname).toBe("Gerrie");
    expect(await responseBody.lastname).toBe("Fourie");
  });

  test("Test patch booking request", async ({ request }) => {

    const response = await request.patch(
      `/booking/${bookingApiController.data.bookingid}`,
      {
        headers: bookingApiController.headers,
        data: {
          bookingdates: {
            checkout: "2030-11-30"
          }
        }
      }
    );

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.bookingdates.checkout).toBe("2030-11-30");
  });

  test("Test delete booking request", async ({ request }) => {
    const response = await request.delete(
      `/booking/${bookingApiController.booking_id}`,
      {
        headers: bookingApiController.headers,
      },
    );
    expect(response.status()).toBe(201);
    const responseBody = await response.text();
    expect(responseBody).toBe("Created");
  });
});
