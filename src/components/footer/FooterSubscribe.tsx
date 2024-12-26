"use client";

export default function FooterSubscribe() {
    return (
        <div className="footer-top container">
        <div className="block-newsletter">
          <h3 className="block__title text-white">
            DON'T MISS THE CHANGE TO GET 40% OFF
          </h3>
          <p>Get the latest products and news update daily in fastest.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="block-newsletter__form"
          >
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Your email address"
            />
            <button
              className="btn btn-secondary fw-medium theme-bg-color-secondary"
              type="submit"
            >
              JOIN
            </button>
          </form>
        </div>
      </div>
    )
}