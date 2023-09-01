import { expect, browser, $ } from '@wdio/globals'

describe('Inventory Page', () => {
    it('Verify elements are displayed on the page', async () => {
        await browser.url(`https://www.saucedemo.com/`)

        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()

        await expect($('.title')).toBeDisplayed()
        await expect($('.shopping_cart_link')).toBeDisplayed()
        await expect($('.inventory_list')).toHaveChildren({ gte: 2 })
    });
    it('Verify no products are available in the Shopping Cart', async () => {
        await browser.url(`https://www.saucedemo.com/`)

        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()

        await $('#add-to-cart-sauce-labs-backpack').click()
        await expect($('.shopping_cart_badge')).toHaveText('1')

        await $('.shopping_cart_link').click()
        await expect($('.inventory_item_name')).toHaveText('Sauce Labs Backpack')

        await $('#remove-sauce-labs-backpack').click()
        await expect($('.removed_cart_item')).toBeExisting()
    })
})

