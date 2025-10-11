import { test, expect } from '@playwright/test';

test.describe('Dashboard Tests - Using Global Authentication', () => {

  test('TC001 - Verify dashboard loads with authenticated user', async ({ page }) => {
    // Este test usa el estado de autenticación guardado del global-setup
    // No necesita hacer login manualmente
    
    // Ir directamente al dashboard (ya estamos autenticados)
    await page.goto('/dashboard');
    
    // Verificar que estamos en el dashboard
    await expect(page).toHaveURL(/.*dashboard.*/);
    
    // Verificar elementos del dashboard
    await expect(page.locator('h1, h2')).toBeVisible();
    
    console.log('✅ Dashboard test completed with global authentication');
  });

  test('TC002 - Navigate to clients section', async ({ page }) => {
    // Navegar a la sección de clientes
    await page.goto('/clients');
    
    // Verificar que llegamos a la página correcta
    await expect(page).toHaveURL(/.*clients.*/);
    
    console.log('✅ Clients navigation test completed');
  });

});