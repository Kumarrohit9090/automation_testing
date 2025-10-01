describe('template spec', () => {
  it('passes', () => {
    cy.viewport(2000, 1250);
    cy.visit('http://3.29.171.47:3000/');
    // cy.wait(10000);
    cy.intercept('POST', '/api/web/product/get-category-list').as('getCategoryList');
    cy.intercept('POST', '/api/web/product/get-product-list').as('getProductList');
    cy.intercept('POST', '/api/web/product/get-product-details_new').as('getProductDetails');
    cy.intercept('Get', '/api/web/product/get-cart-product').as('getCartProduct');
    cy.get('#__next > header > div.header_top.font1 > div > div.headtags > a > span.font1-semibold').click();
    cy.get('#user_email').type('1903041');
    cy.get('#user_pass').type('1903041');
    cy.get('.signin_btn').click();
    // cy.get('.headtags .headtags-col:nth-child(1) img').click();

    cy.wait('@getCategoryList')
    cy.get('#__next > div.jsx-47cdafc8f06dbeeb.container > div > a:nth-child(1) > div > div > img').click();
    cy.wait('@getProductList');
    cy.get(' div.jsx-c073e60278af30f6.product_section > div:nth-child(1)').click();
    cy.wait('@getProductDetails');
    cy.get('div.productlist.font1-semibold > div > table > tbody > tr:nth-child(1)').click();
    cy.get('table tbody tr:nth-child(1) td:nth-child(4) button.plusbtn').dblclick();
    // cy.get('table tbody tr:nth-child(1) td:nth-child(4) button.minusbtn').dblclick();
    cy.get('div table tbody tr:nth-child(1) td:nth-child(5) button.new_button').click();
    cy.wait('@getCartProduct');
    cy.get('#__next > div:nth-child(3) > div.desc_bottom > div:nth-child(2) > div.desc_buttons > button').click();
    // cy.get('.cart_prod table tbody tr td:nth-child(6) button.removeItembtn').click();
    cy.get('.checkoutbtn').click();
    cy.get('.payment_summery .payment_option .pay_type label').click();
    cy.get('.paymentbtn').click();
    // cy.visit('https://demo-ipg.ctdev.comtrust.ae/PaymentEx/MerchantPay/Payment?t=d729cdcd1d4e04151b17e9d6a2154dea&lang=en&layout=C0STCBVLEI');
    // cy.get('#cardNumber').click();
    // cy.get("#cardNumber").type('4111111111111111');
    cy.origin('https://demo-ipg.ctdev.comtrust.ae/PaymentEx/MerchantPay/Payment?t=d729cdcd1d4e04151b17e9d6a2154dea&lang=en&layout=C0STCBVLEI', () => {
      cy.get('#cardNumber').click();
      cy.get('input[name="cardNumber"]').type('4111111111111111');
      cy.get('input[name="expiry-date"]').type('01/26');
      cy.get('input[name="cvv"]').type('123');
      cy.get('.submit-payment-button').click();
      cy.get('.payment-success-title').should('have.text', 'Payment Successful');
    });
  })
})