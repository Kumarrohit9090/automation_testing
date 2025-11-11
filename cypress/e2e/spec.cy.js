describe('template spec', () => {
  it('passes', () => {
    cy.viewport(2000, 1250);
    cy.visit('http://3.29.171.47:3000/');
    // cy.wait(10000);
    cy.intercept('POST', '/api/web/product/get-category-list').as('getCategoryList');
    cy.intercept('POST', '/api/web/product/get-product-list').as('getProductList');
    cy.intercept('POST', '/api/web/product/get-product-details_new').as('getProductDetails');
    cy.intercept('Get', '/api/web/product/get-cart-product').as('getCartProduct');
    cy.intercept('POST', '/api/web/order/add-order').as('placeOrder');

    cy.get('#__next > header > div.header_top.font1 > div > div.headtags > a > span.font1-semibold').click();
    cy.get('#user_email').type('1893119');
    cy.get('#user_pass').type('1893119');
    cy.get('.signin_btn').click();
    // cy.get('.headtags .headtags-col:nth-child(1) img').click();

    cy.wait('@getCategoryList')
    cy.get('#__next > div.jsx-47cdafc8f06dbeeb.container > div > a:nth-child(1) > div > div > img').click();
    cy.wait('@getProductList');
    cy.get(' div.jsx-c073e60278af30f6.product_section > div:nth-child(2)').click();
    cy.wait('@getProductDetails');
    cy.wait(3000);
    cy.get('div.productlist.font1-semibold > div > table > tbody > tr:nth-child(1)').click();
    cy.get('table tbody tr:nth-child(1) td:nth-child(4) button.plusbtn').dblclick();
    // cy.get('table tbody tr:nth-child(1) td:nth-child(4) button.minusbtn').dblclick();
    cy.get('div table tbody tr:nth-child(1) td:nth-child(5) button.new_button').click();
    cy.wait('@getCartProduct');
    cy.get('#__next > div:nth-child(3) > div.desc_bottom > div:nth-child(2) > div.desc_buttons > button').click();
    // cy.get('.cart_prod table tbody tr td:nth-child(6) button.removeItembtn').click();
    cy.get('.checkoutbtn').click();
    
    cy.wait('@getCartProduct');
    cy.wait(2000);
    cy.get('.payment_option button:nth-child(3)').click();
    cy.get('.payment_summery .payment_option .pay_type:nth-child(3) label').click();
    cy.get('.paymentbtn').click();
    cy.wait('@placeOrder', { timeout: 300000 }).its('response.statusCode').should('eq', 200);
    cy.origin('https://demo-ipg.ctdev.comtrust.ae/PaymentEx/MerchantPay/Payment', () => {
      cy.wait(5000); 
  cy.get("#CardNumberText #cardNumber").type('4111111111111111');
      cy.get('#ExpiryMonthText input.select-dropdown').click({ force: true })
      cy.get('#ExpiryMonthText .dropdown-content li span').contains('June').click({ force: true })
      cy.get('#ExpiryYearText input.select-dropdown').click({ force: true })
      cy.get('#ExpiryYearText .dropdown-content li span').contains('2026').click({ force: true })
      cy.get('#CVV_Text input[name="ValidationCode"]').type('123');

  cy.get('#btnPay').click();
});


  });
});


