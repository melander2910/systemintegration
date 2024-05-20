export const constants = {
    paymentLinks: {
        monthlySubscription: 
        process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEUbJp65ubad1cAdQQ"
        : ""
    }
}