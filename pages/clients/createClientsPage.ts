import { Page, expect, Locator } from '@playwright/test';
import { BaseNavigationPage } from '../baseNavigationPage';

export class CreateClientsPage extends BaseNavigationPage {

    // ========== PAGE HEADER SELECTORS ==========
    private readonly pageTitle = 'h2:has-text("New Client")';
    private readonly quickAddButton = '[data-cy="quickPopoverButton"]';
    private readonly searchButtonMobile = 'button:has(svg[viewBox="0 0 24 24"]:has(path[d*="M10 18a7.952"]))';
    private readonly searchBarDesktop = 'div:has(p:has-text("Find invoices, clients, and more"))';
    private readonly searchShortcut = 'p:has-text("Ctrl+K")';
    private readonly notificationButton = 'button:has(svg[viewBox="0 0 24 24"]:has(path[d="M18 8A6 6 0"]))';
    private readonly upgradeButton = 'button:has-text("Unlock Pro"), button:has-text("Upgrade")';
    private readonly saveButton = 'button:has-text("Save")';

    // ========== BREADCRUMB SELECTORS ==========
    private readonly breadcrumbContainer = 'nav[aria-label="Breadcrumb"]';
    private readonly breadcrumbHome = 'a[href="#/dashboard"]:has(svg[viewBox="0 0 18 18"])';
    private readonly breadcrumbClients = 'a[href="#/clients"]:has-text("Clients")';
    private readonly breadcrumbNewClient = 'a[href="#/clients/create"]:has-text("New Client")';

    // ========== TAB NAVIGATION SELECTORS ==========
    private readonly tabsContainer = '[data-cy="tabs"]';
    private readonly mobileTabSelect = 'div:has(#react-select-5-placeholder)';
    private readonly createTab = 'a[href="#/clients/create"]:has-text("Create")';
    private readonly settingsTab = 'a[href="#/clients/create/settings"]:has-text("Settings")';
    private readonly documentsTab = 'a[href="#/clients/create/documents"]:has-text("Documents")';
    private readonly locationsTab = 'a[href="#/clients/create/locations"]:has-text("Locations")';

    // ========== COMPANY DETAILS FORM SELECTORS ==========
    private readonly companyDetailsSection = 'div:has(h3:has-text("Company Details"))';
    private readonly companyDetailsTitle = 'h3:has-text("Company Details")';
    
    // Company Details Form Fields
    private readonly nameField = 'input[type="text"]:near(span:has-text("Name"))';
    private readonly numberField = 'input[type="text"]:near(span:has-text("Number"))';
    private readonly groupDropdown = 'div:has(#react-select-9-input)';
    private readonly assignedUserDropdown = 'div:has(#react-select-10-input)';
    private readonly idNumberField = 'input[type="text"]:near(span:has-text("ID Number"))';
    private readonly vatNumberField = 'input[type="text"]:near(span:has-text("VAT Number"))';
    private readonly websiteField = 'input[type="text"]:near(span:has-text("Website"))';
    private readonly phoneField = 'input[type="text"]:near(span:has-text("Phone"))';
    private readonly routingIdField = 'input[type="text"]:near(span:has-text("Routing ID"))';
    private readonly validVatToggle = 'button[id*="headlessui-switch"]:near(span:has-text("Valid VAT Number"))';
    private readonly taxExemptToggle = 'button[id*="headlessui-switch"]:near(span:has-text("Tax Exempt"))';
    private readonly classificationDropdown = 'div:has(#react-select-6-input)';

    // ========== CONTACTS FORM SELECTORS ==========
    private readonly contactsSection = 'div:has(h3:has-text("Contacts"))';
    private readonly contactsTitle = 'h3:has-text("Contacts")';
    private readonly addContactButton = 'button:has-text("Add contact")';
    
    // Contact Form Fields
    private readonly firstNameField = 'input#first_name_0';
    private readonly lastNameField = 'input#last_name_0';
    private readonly emailField = 'input#email_0';
    private readonly contactPhoneField = 'input#phone_0';
    private readonly addToInvoicesToggle = 'button[id*="headlessui-switch"]:near(span:has-text("Add to Invoices"))';

    // ========== ADDRESS FORM SELECTORS ==========
    private readonly addressSection = 'div:has(h3:has-text("Address"))';
    private readonly addressTitle = 'h3:has-text("Address")';
    
    // Address Tabs
    private readonly billingAddressTab = 'button:has-text("Billing Address")';
    private readonly shippingAddressTab = 'button:has-text("Shipping Address")';
    
    // Billing Address Fields
    private readonly billingStreetField = 'input#address1';
    private readonly billingAptField = 'input#address2';
    private readonly billingCityField = 'input#city';
    private readonly billingStateField = 'input#state';
    private readonly billingPostalCodeField = 'input#postal_code';
    private readonly billingCountryDropdown = 'div:has(#react-select-7-input)';
    
    // Shipping Address Fields
    private readonly copyBillingButton = 'button:has-text("Copy Billing")';
    private readonly shippingStreetField = 'input#shipping_address1';
    private readonly shippingAptField = 'input#shipping_address2';
    private readonly shippingCityField = 'input#shipping_city';
    private readonly shippingStateField = 'input#shipping_state';
    private readonly shippingPostalCodeField = 'input#shipping_postal_code';
    private readonly shippingCountryDropdown = 'div:has(#react-select-8-input)';

    // ========== FORM CONTAINERS ==========
    private readonly leftColumn = 'div.w-full.xl\\:w-1\\/2:first-child';
    private readonly rightColumn = 'div.w-full.xl\\:w-1\\/2:last-child';
    private readonly formContainer = 'div.flex.flex-col.xl\\:flex-row';

    // ========== CONSTRUCTOR ==========
    constructor(page: Page) {
        super(page);
    }

    // ========== PAGE HEADER METHODS ==========

    /**
     * Gets the page title text
     */
    async getPageTitle(): Promise<string> {
        return await this.page.locator(this.pageTitle).textContent() || '';
    }

    /**
     * Checks if the page title is visible
     */
    async isPageTitleVisible(): Promise<boolean> {
        return await this.page.locator(this.pageTitle).isVisible();
    }

    /**
     * Clicks the quick add button
     */
    async clickQuickAddButton(): Promise<void> {
        await this.page.locator(this.quickAddButton).click();
    }

    /**
     * Clicks the save button
     */
    async clickSaveButton(): Promise<void> {
        await this.page.locator(this.saveButton).click();
    }

    /**
     * Checks if the save button is visible
     */
    async isSaveButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.saveButton).isVisible();
    }

    /**
     * Gets the save button text
     */
    async getSaveButtonText(): Promise<string> {
        return await this.page.locator(this.saveButton).textContent() || '';
    }

    // ========== BREADCRUMB METHODS ==========

    /**
     * Checks if the breadcrumb container is visible
     */
    async isBreadcrumbVisible(): Promise<boolean> {
        return await this.page.locator(this.breadcrumbContainer).isVisible();
    }

    /**
     * Clicks the home breadcrumb
     */
    async clickBreadcrumbHome(): Promise<void> {
        await this.page.locator(this.breadcrumbHome).click();
    }

    /**
     * Clicks the clients breadcrumb
     */
    async clickBreadcrumbClients(): Promise<void> {
        await this.page.locator(this.breadcrumbClients).click();
    }

    /**
     * Checks if the new client breadcrumb is visible
     */
    async isBreadcrumbNewClientVisible(): Promise<boolean> {
        return await this.page.locator(this.breadcrumbNewClient).isVisible();
    }

    // ========== TAB NAVIGATION METHODS ==========

    /**
     * Checks if the tabs container is visible
     */
    async isTabsContainerVisible(): Promise<boolean> {
        return await this.page.locator(this.tabsContainer).isVisible();
    }

    /**
     * Clicks the Create tab
     */
    async clickCreateTab(): Promise<void> {
        await this.page.locator(this.createTab).click();
    }

    /**
     * Clicks the Settings tab
     */
    async clickSettingsTab(): Promise<void> {
        await this.page.locator(this.settingsTab).click();
    }

    /**
     * Clicks the Documents tab
     */
    async clickDocumentsTab(): Promise<void> {
        await this.page.locator(this.documentsTab).click();
    }

    /**
     * Clicks the Locations tab
     */
    async clickLocationsTab(): Promise<void> {
        await this.page.locator(this.locationsTab).click();
    }

    /**
     * Checks if the Create tab is active
     */
    async isCreateTabActive(): Promise<boolean> {
        const tab = this.page.locator(this.createTab);
        const style = await tab.getAttribute('style');
        return style?.includes('border-bottom: 1px solid rgb(42, 48, 61)') || false;
    }

    // ========== COMPANY DETAILS FORM METHODS ==========

    /**
     * Checks if the company details section is visible
     */
    async isCompanyDetailsSectionVisible(): Promise<boolean> {
        return await this.page.locator(this.companyDetailsSection).isVisible();
    }

    /**
     * Gets the company details title text
     */
    async getCompanyDetailsTitle(): Promise<string> {
        return await this.page.locator(this.companyDetailsTitle).textContent() || '';
    }

    /**
     * Fills the name field
     */
    async fillNameField(name: string): Promise<void> {
        await this.page.locator(this.nameField).fill(name);
    }

    /**
     * Gets the name field value
     */
    async getNameFieldValue(): Promise<string> {
        return await this.page.locator(this.nameField).inputValue();
    }

    /**
     * Fills the number field
     */
    async fillNumberField(number: string): Promise<void> {
        await this.page.locator(this.numberField).fill(number);
    }

    /**
     * Gets the number field value
     */
    async getNumberFieldValue(): Promise<string> {
        return await this.page.locator(this.numberField).inputValue();
    }

    /**
     * Clicks the group dropdown
     */
    async clickGroupDropdown(): Promise<void> {
        await this.page.locator(this.groupDropdown).click();
    }

    /**
     * Clicks the assigned user dropdown
     */
    async clickAssignedUserDropdown(): Promise<void> {
        await this.page.locator(this.assignedUserDropdown).click();
    }

    /**
     * Fills the ID number field
     */
    async fillIdNumberField(idNumber: string): Promise<void> {
        await this.page.locator(this.idNumberField).fill(idNumber);
    }

    /**
     * Gets the ID number field value
     */
    async getIdNumberFieldValue(): Promise<string> {
        return await this.page.locator(this.idNumberField).inputValue();
    }

    /**
     * Fills the VAT number field
     */
    async fillVatNumberField(vatNumber: string): Promise<void> {
        await this.page.locator(this.vatNumberField).fill(vatNumber);
    }

    /**
     * Gets the VAT number field value
     */
    async getVatNumberFieldValue(): Promise<string> {
        return await this.page.locator(this.vatNumberField).inputValue();
    }

    /**
     * Fills the website field
     */
    async fillWebsiteField(website: string): Promise<void> {
        await this.page.locator(this.websiteField).fill(website);
    }

    /**
     * Gets the website field value
     */
    async getWebsiteFieldValue(): Promise<string> {
        return await this.page.locator(this.websiteField).inputValue();
    }

    /**
     * Fills the phone field
     */
    async fillPhoneField(phone: string): Promise<void> {
        await this.page.locator(this.phoneField).fill(phone);
    }

    /**
     * Gets the phone field value
     */
    async getPhoneFieldValue(): Promise<string> {
        return await this.page.locator(this.phoneField).inputValue();
    }

    /**
     * Fills the routing ID field
     */
    async fillRoutingIdField(routingId: string): Promise<void> {
        await this.page.locator(this.routingIdField).fill(routingId);
    }

    /**
     * Gets the routing ID field value
     */
    async getRoutingIdFieldValue(): Promise<string> {
        return await this.page.locator(this.routingIdField).inputValue();
    }

    /**
     * Toggles the valid VAT number switch
     */
    async toggleValidVatNumber(): Promise<void> {
        await this.page.locator(this.validVatToggle).click();
    }

    /**
     * Checks if valid VAT number is enabled
     */
    async isValidVatNumberEnabled(): Promise<boolean> {
        const ariaChecked = await this.page.locator(this.validVatToggle).getAttribute('aria-checked');
        return ariaChecked === 'true';
    }

    /**
     * Toggles the tax exempt switch
     */
    async toggleTaxExempt(): Promise<void> {
        await this.page.locator(this.taxExemptToggle).click();
    }

    /**
     * Checks if tax exempt is enabled
     */
    async isTaxExemptEnabled(): Promise<boolean> {
        const ariaChecked = await this.page.locator(this.taxExemptToggle).getAttribute('aria-checked');
        return ariaChecked === 'true';
    }

    /**
     * Clicks the classification dropdown
     */
    async clickClassificationDropdown(): Promise<void> {
        await this.page.locator(this.classificationDropdown).click();
    }

    // ========== CONTACTS FORM METHODS ==========

    /**
     * Checks if the contacts section is visible
     */
    async isContactsSectionVisible(): Promise<boolean> {
        return await this.page.locator(this.contactsSection).isVisible();
    }

    /**
     * Gets the contacts title text
     */
    async getContactsTitle(): Promise<string> {
        return await this.page.locator(this.contactsTitle).textContent() || '';
    }

    /**
     * Clicks the add contact button
     */
    async clickAddContactButton(): Promise<void> {
        await this.page.locator(this.addContactButton).click();
    }

    /**
     * Checks if the add contact button is visible
     */
    async isAddContactButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.addContactButton).isVisible();
    }

    /**
     * Fills the first name field
     */
    async fillFirstNameField(firstName: string): Promise<void> {
        await this.page.locator(this.firstNameField).fill(firstName);
    }

    /**
     * Gets the first name field value
     */
    async getFirstNameFieldValue(): Promise<string> {
        return await this.page.locator(this.firstNameField).inputValue();
    }

    /**
     * Fills the last name field
     */
    async fillLastNameField(lastName: string): Promise<void> {
        await this.page.locator(this.lastNameField).fill(lastName);
    }

    /**
     * Gets the last name field value
     */
    async getLastNameFieldValue(): Promise<string> {
        return await this.page.locator(this.lastNameField).inputValue();
    }

    /**
     * Fills the email field
     */
    async fillEmailField(email: string): Promise<void> {
        await this.page.locator(this.emailField).fill(email);
    }

    /**
     * Gets the email field value
     */
    async getEmailFieldValue(): Promise<string> {
        return await this.page.locator(this.emailField).inputValue();
    }

    /**
     * Fills the contact phone field
     */
    async fillContactPhoneField(phone: string): Promise<void> {
        await this.page.locator(this.contactPhoneField).fill(phone);
    }

    /**
     * Gets the contact phone field value
     */
    async getContactPhoneFieldValue(): Promise<string> {
        return await this.page.locator(this.contactPhoneField).inputValue();
    }

    /**
     * Toggles the add to invoices switch
     */
    async toggleAddToInvoices(): Promise<void> {
        await this.page.locator(this.addToInvoicesToggle).click();
    }

    /**
     * Checks if add to invoices is enabled
     */
    async isAddToInvoicesEnabled(): Promise<boolean> {
        const ariaChecked = await this.page.locator(this.addToInvoicesToggle).getAttribute('aria-checked');
        return ariaChecked === 'true';
    }

    // ========== ADDRESS FORM METHODS ==========

    /**
     * Checks if the address section is visible
     */
    async isAddressSectionVisible(): Promise<boolean> {
        return await this.page.locator(this.addressSection).isVisible();
    }

    /**
     * Gets the address title text
     */
    async getAddressTitle(): Promise<string> {
        return await this.page.locator(this.addressTitle).textContent() || '';
    }

    /**
     * Clicks the billing address tab
     */
    async clickBillingAddressTab(): Promise<void> {
        await this.page.locator(this.billingAddressTab).click();
    }

    /**
     * Clicks the shipping address tab
     */
    async clickShippingAddressTab(): Promise<void> {
        await this.page.locator(this.shippingAddressTab).click();
    }

    /**
     * Checks if billing address tab is active
     */
    async isBillingAddressTabActive(): Promise<boolean> {
        const style = await this.page.locator(this.billingAddressTab).getAttribute('style');
        return style?.includes('border-bottom: 1px solid rgb(42, 48, 61)') || false;
    }

    /**
     * Fills the billing street field
     */
    async fillBillingStreetField(street: string): Promise<void> {
        await this.page.locator(this.billingStreetField).fill(street);
    }

    /**
     * Gets the billing street field value
     */
    async getBillingStreetFieldValue(): Promise<string> {
        return await this.page.locator(this.billingStreetField).inputValue();
    }

    /**
     * Fills the billing apt field
     */
    async fillBillingAptField(apt: string): Promise<void> {
        await this.page.locator(this.billingAptField).fill(apt);
    }

    /**
     * Gets the billing apt field value
     */
    async getBillingAptFieldValue(): Promise<string> {
        return await this.page.locator(this.billingAptField).inputValue();
    }

    /**
     * Fills the billing city field
     */
    async fillBillingCityField(city: string): Promise<void> {
        await this.page.locator(this.billingCityField).fill(city);
    }

    /**
     * Gets the billing city field value
     */
    async getBillingCityFieldValue(): Promise<string> {
        return await this.page.locator(this.billingCityField).inputValue();
    }

    /**
     * Fills the billing state field
     */
    async fillBillingStateField(state: string): Promise<void> {
        await this.page.locator(this.billingStateField).fill(state);
    }

    /**
     * Gets the billing state field value
     */
    async getBillingStateFieldValue(): Promise<string> {
        return await this.page.locator(this.billingStateField).inputValue();
    }

    /**
     * Fills the billing postal code field
     */
    async fillBillingPostalCodeField(postalCode: string): Promise<void> {
        await this.page.locator(this.billingPostalCodeField).fill(postalCode);
    }

    /**
     * Gets the billing postal code field value
     */
    async getBillingPostalCodeFieldValue(): Promise<string> {
        return await this.page.locator(this.billingPostalCodeField).inputValue();
    }

    /**
     * Clicks the billing country dropdown
     */
    async clickBillingCountryDropdown(): Promise<void> {
        await this.page.locator(this.billingCountryDropdown).click();
    }

    /**
     * Clicks the copy billing button
     */
    async clickCopyBillingButton(): Promise<void> {
        await this.page.locator(this.copyBillingButton).click();
    }

    /**
     * Fills the shipping street field
     */
    async fillShippingStreetField(street: string): Promise<void> {
        await this.page.locator(this.shippingStreetField).fill(street);
    }

    /**
     * Gets the shipping street field value
     */
    async getShippingStreetFieldValue(): Promise<string> {
        return await this.page.locator(this.shippingStreetField).inputValue();
    }

    /**
     * Fills the shipping city field
     */
    async fillShippingCityField(city: string): Promise<void> {
        await this.page.locator(this.shippingCityField).fill(city);
    }

    /**
     * Gets the shipping city field value
     */
    async getShippingCityFieldValue(): Promise<string> {
        return await this.page.locator(this.shippingCityField).inputValue();
    }

    /**
     * Clicks the shipping country dropdown
     */
    async clickShippingCountryDropdown(): Promise<void> {
        await this.page.locator(this.shippingCountryDropdown).click();
    }

    // ========== UTILITY METHODS ==========

    /**
     * Waits for the page to be fully loaded
     */
    async waitForPageToLoad(): Promise<void> {
        await this.page.waitForSelector(this.pageTitle);
        await this.page.waitForSelector(this.companyDetailsSection);
        await this.page.waitForSelector(this.contactsSection);
        await this.page.waitForSelector(this.addressSection);
    }

    /**
     * Validates that the create clients page is loaded correctly
     */
    async validateCreateClientsPageIsLoaded(): Promise<void> {
        await expect(this.page.locator(this.pageTitle)).toBeVisible();
        await expect(this.page.locator(this.companyDetailsSection)).toBeVisible();
        await expect(this.page.locator(this.contactsSection)).toBeVisible();
        await expect(this.page.locator(this.addressSection)).toBeVisible();
        await expect(this.page.locator(this.saveButton)).toBeVisible();
        await expect(this.page.locator(this.breadcrumbNewClient)).toBeVisible();
    }

    /**
     * Fills basic company information
     */
    async fillBasicCompanyInfo(data: {
        name: string;
        number?: string;
        idNumber?: string;
        website?: string;
        phone?: string;
    }): Promise<void> {
        await this.fillNameField(data.name);
        
        if (data.number) {
            await this.fillNumberField(data.number);
        }
        
        if (data.idNumber) {
            await this.fillIdNumberField(data.idNumber);
        }
        
        if (data.website) {
            await this.fillWebsiteField(data.website);
        }
        
        if (data.phone) {
            await this.fillPhoneField(data.phone);
        }
    }

    /**
     * Fills contact information
     */
    async fillContactInfo(data: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        addToInvoices?: boolean;
    }): Promise<void> {
        await this.fillFirstNameField(data.firstName);
        await this.fillLastNameField(data.lastName);
        await this.fillEmailField(data.email);
        
        if (data.phone) {
            await this.fillContactPhoneField(data.phone);
        }
        
        if (data.addToInvoices) {
            await this.toggleAddToInvoices();
        }
    }

    /**
     * Fills billing address information
     */
    async fillBillingAddress(data: {
        street: string;
        apt?: string;
        city: string;
        state: string;
        postalCode: string;
    }): Promise<void> {
        await this.clickBillingAddressTab();
        await this.fillBillingStreetField(data.street);
        
        if (data.apt) {
            await this.fillBillingAptField(data.apt);
        }
        
        await this.fillBillingCityField(data.city);
        await this.fillBillingStateField(data.state);
        await this.fillBillingPostalCodeField(data.postalCode);
    }

    /**
     * Fills complete client form
     */
    async fillCompleteClientForm(data: {
        company: {
            name: string;
            number?: string;
            idNumber?: string;
            website?: string;
            phone?: string;
        };
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            addToInvoices?: boolean;
        };
        billing: {
            street: string;
            apt?: string;
            city: string;
            state: string;
            postalCode: string;
        };
    }): Promise<void> {
        await this.fillBasicCompanyInfo(data.company);
        await this.fillContactInfo(data.contact);
        await this.fillBillingAddress(data.billing);
    }

    /**
     * Creates a new client with provided data
     */
    async createNewClient(data: {
        company: {
            name: string;
            number?: string;
            idNumber?: string;
            website?: string;
            phone?: string;
        };
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone?: string;
            addToInvoices?: boolean;
        };
        billing: {
            street: string;
            apt?: string;
            city: string;
            state: string;
            postalCode: string;
        };
    }): Promise<void> {
        await this.waitForPageToLoad();
        await this.validateCreateClientsPageIsLoaded();
        await this.fillCompleteClientForm(data);
        await this.clickSaveButton();
    }

    /**
     * Checks if all required fields are filled
     */
    async areRequiredFieldsFilled(): Promise<boolean> {
        const nameValue = await this.getNameFieldValue();
        const firstNameValue = await this.getFirstNameFieldValue();
        const lastNameValue = await this.getLastNameFieldValue();
        const emailValue = await this.getEmailFieldValue();
        
        return nameValue !== '' && firstNameValue !== '' && 
               lastNameValue !== '' && emailValue !== '';
    }

    /**
     * Gets all form data for validation
     */
    async getAllFormData(): Promise<{
        company: {
            name: string;
            number: string;
            idNumber: string;
            website: string;
            phone: string;
        };
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
        };
        billing: {
            street: string;
            apt: string;
            city: string;
            state: string;
            postalCode: string;
        };
    }> {
        return {
            company: {
                name: await this.getNameFieldValue(),
                number: await this.getNumberFieldValue(),
                idNumber: await this.getIdNumberFieldValue(),
                website: await this.getWebsiteFieldValue(),
                phone: await this.getPhoneFieldValue(),
            },
            contact: {
                firstName: await this.getFirstNameFieldValue(),
                lastName: await this.getLastNameFieldValue(),
                email: await this.getEmailFieldValue(),
                phone: await this.getContactPhoneFieldValue(),
            },
            billing: {
                street: await this.getBillingStreetFieldValue(),
                apt: await this.getBillingAptFieldValue(),
                city: await this.getBillingCityFieldValue(),
                state: await this.getBillingStateFieldValue(),
                postalCode: await this.getBillingPostalCodeFieldValue(),
            }
        };
    }
}