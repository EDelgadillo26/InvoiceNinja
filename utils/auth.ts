import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import appConfig from '../app-config.json';

export class AuthHelper {
  
  /**
   * Realiza login completo y mantiene la sesión activa
   */
  static async loginAndSaveState(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);
    
    console.log('🔐 Performing global login...');
    await loginPage.gotoLogin();
    await loginPage.fillCredentialsAndSubmit(appConfig.invoiceNinja.email, appConfig.invoiceNinja.password);
    
    await loginPage.validateLogin(true, {
      id: 'valid_user',
      email: appConfig.invoiceNinja.email,
      password: appConfig.invoiceNinja.password,
      description: 'Usuario válido de app-config.json',
      isValid: true
    });
    
    console.log('✅ Global login successful - Session ready');
  }

  /**
   * Solo realiza login sin validaciones adicionales (más rápido)
   */
  static async quickLogin(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);
    
    await loginPage.gotoLogin();
    await loginPage.fillCredentialsAndSubmit(appConfig.invoiceNinja.email, appConfig.invoiceNinja.password);
    
    // Esperar solo a que llegue a la página principal después del login
    await page.waitForURL(url => url.toString().includes('boards') || url.toString().includes('dashboard'), { timeout: 15000 });
  }
}