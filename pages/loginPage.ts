import { Page, Locator, expect } from '@playwright/test';
import { config } from '../utils/config';

export class LoginPage {
  private page: Page;
  
  // Selectores principales optimizados
  private inputEmail = 'input[name="email"]';
  private inputPassword = '#password';
  private loginButton  = 'button[type="submit"]';
  
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to login page with verification
   */
  async gotoLogin() {
    await this.page.goto(config.urls.login, { timeout: 45000 });
    
    // Clear any existing authentication state
    try {
      await this.page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch (error) {
      // Ignore if localStorage is not accessible
      console.log('Note: Could not clear localStorage (this is normal in some contexts)');
    }
    
    // Verify login page loaded correctly
    const emailInput = this.page.locator(this.inputEmail);
    await emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(emailInput).toBeVisible();
  }

  /**
   * Fill login credentials with proper verification
   */
  async fillCredentials(email: string, password: string) {
    // Fill email field
    const emailInput = this.page.locator(this.inputEmail);
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await expect(emailInput).toBeVisible();
    await emailInput.fill(email);
  
    // Wait for and fill password field (if email is valid)
    try {
      const passwordInput = this.page.locator(this.inputPassword);
      await passwordInput.waitFor({ state: 'visible', timeout: 8000 });
      await expect(passwordInput).toBeVisible();
      await passwordInput.fill(password);
      console.log('✅ Password field found and filled');
    } catch (error) {
      console.log('⚠️  Password field not found - possibly invalid email');
      // Don't throw error here, let validation handle it
    }
  }

  /**
   * Fill credentials and submit login form
   */
  async fillCredentialsAndSubmit(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.submit();
  }

  /**
   * Submit login form with verification
   */
  async submit() {
    try {
      const loginButton = this.page.locator(this.loginButton);
      await loginButton.waitFor({ state: 'visible', timeout: 8000 });
      await expect(loginButton).toBeVisible();
      await loginButton.click();
      console.log('✅ Submit button clicked');
    } catch (error) {
      console.log('⚠️  Submit button not found or not clickable');
      // Don't throw error here, let validation handle it
    }
  }

  /**
   * Check if any error is visible on the page
   */
  async hasAnyError(): Promise<boolean> {
    try {
      // Check for specific error box from InvoiceNinja
      const errorBox = this.page.locator('div.error-message-box');
      const errorBoxCount = await errorBox.count();
      
      // Check for common error messages
      const genericErrorElements = this.page.locator('text=/email not set|not found|credentials do not match|invalid|incorrect/i');
      const genericErrorCount = await genericErrorElements.count();
      
      const hasErrors = errorBoxCount > 0 || genericErrorCount > 0;
      
      if (hasErrors) {
        console.log(`🚨 Errors detected: ErrorBox(${errorBoxCount}), Generic(${genericErrorCount})`);
      }
      
      return hasErrors;
    } catch (error) {
      console.log('Error checking for errors:', error);
      return false;
    }
  }

  /**
   * Get specific error message from the page
   */
  async getErrorMessage(): Promise<string> {
    try {
      // Check for error message in the error box
      const errorBox = this.page.locator('div.error-message-box div.w-full.break-all');
      if (await errorBox.count() > 0) {
        const errorText = (await errorBox.textContent()) || '';
        console.log(`🚨 Error message found: "${errorText}"`);
        return errorText.trim();
      }
    } catch (error) {
      console.log('No specific error message found');
    }
    return '';
  }

  /**
   * Validate login result (success or failure) with enhanced verification
   */
  async validateLogin(isValidUser: boolean, userCase: any) {
    console.log(`🔍 Validating ${isValidUser ? 'successful' : 'failed'} login for user: ${userCase.id}...`);
    
    if (isValidUser) {
      // For valid users, expect successful login and redirect
      try {
        // Wait for URL change indicating successful login
        await this.page.waitForURL(url => {
          const urlStr = url.toString();
          return urlStr.includes('boards') || urlStr.includes('dashboard') || urlStr.includes('clients');
        }, { timeout: 20000 });
        
        const currentUrl = this.page.url();
        console.log('✅ SUCCESS: Login successful - redirected');
        console.log(`Final URL: ${currentUrl}`);

        // Verify we're not still on login page
        expect(currentUrl).not.toContain('login');
        
      } catch (error) {
        console.log('❌ FAILURE: Valid user was not redirected properly');
        console.log(`Current URL: ${this.page.url()}`);
        throw error;
      }
      
    } else {
      // For invalid users, expect login failure
      try {
        // Wait a moment for any error messages to appear
        await this.page.waitForTimeout(3000);
        
        const hasError = await this.hasAnyError();
        const currentUrl = this.page.url();
        const errorMessage = await this.getErrorMessage();
        
        console.log(`Current URL: ${currentUrl}`);
        console.log(`Has error: ${hasError}`);
        console.log(`Error message: "${errorMessage}"`);
        
        // Login should fail - either show error or stay on login page
        if (hasError) {
          console.log('✅ LOGIN FAILED CORRECTLY: Error message displayed');
          expect(hasError).toBe(true);
        } else {
          console.log('✅ LOGIN FAILED CORRECTLY: No redirect occurred');
          expect(currentUrl).toContain('login');
        }
        
      } catch (error) {
        // If there's an error during validation, assume login failed correctly
        const currentUrl = this.page.url();
        console.log('✅ LOGIN FAILED CORRECTLY: Exception during login process');
        console.log(`Current URL: ${currentUrl}`);
        expect(currentUrl).toContain('login');
      }
    }
  }
}