export class booking_api_controller {
  constructor() {
    this.booking_id = null;
    this.token = null;
    this.data = null;
  }

  bookingDataKeys = [
    "firstname",
    "lastname",
    "totalprice",
    "depositpaid",
    "bookingdates",
    "additionalneeds",
  ];

  headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Cookie: null
  };

  createBooking = {
    firstname: "Capitec",
    lastname: "Bank",
    totalprice: 256,
    depositpaid: false,
    bookingdates: {
      checkin: "2026-02-01",
      checkout: "2040-11-30",
    },
    additionalneeds: "Growth",
  };

  getBookingInfo(response) {
    this.data = response;
  }
  updateCookie() {
    this.headers.Cookie = `token=${this.token}`;
  }
}
