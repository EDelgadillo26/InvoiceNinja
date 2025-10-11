# Invoice Ninja - Playwright Test Framework
## Pablo Enrique Delgadillo Fernandez

## 📋 Estructura del Framework

El framework está organizado para separar los tests de login (que no requieren autenticación previa) de los tests que sí la requieren.

### 📁 Estructura de Archivos

```
├── tests/
│   ├── login.spec.ts        # Tests de autenticación (sin global setup)
│   └── dashboard.spec.ts    # Tests autenticados (con global setup)
├── pages/
│   └── loginPage.ts         # Page Object Model para login
├── utils/
│   ├── auth.ts             # Helper para autenticación
│   ├── config.ts           # Configuración general
│   └── global-setup.ts     # Setup global para autenticación
├── data/
│   └── users.json          # Datos de test de usuarios inválidos
├── playwright.config.ts         # Configuración unificada (2 proyectos)
└── app-config.json         # Credenciales válidas
```

## 🚀 Comandos Disponibles

### Ejecutar Tests de Login (sin global setup)
```bash
npm run test:login
```

### Ejecutar Tests Autenticados (con global setup)
```bash
npm run test:auth
```

### Ejecutar Todos los Tests
```bash
npm run test:all
```

### Otros Comandos
```bash
npm run test:headed    # Ejecutar con interfaz gráfica
npm run test:debug     # Ejecutar en modo debug
npm run report         # Ver reporte HTML
```

## 🔧 Configuración Unificada (playwright.config.ts)

### Proyecto: login-tests
- **Global setup se ejecuta**: Pero NO se usa el estado guardado
- **storageState: undefined**: Cada test limpia cookies y localStorage
- **Solo ejecuta**: `login.spec.ts`
- **Limpieza automática**: clearCookies() y clearPermissions() antes de cada test

### Proyecto: authenticated-tests
- **Global setup se ejecuta**: Y SÍ se usa el estado guardado
- **storageState: 'auth-state.json'**: Usa autenticación previa
- **Excluye**: `login.spec.ts`
- **Más rápido**: No necesita hacer login manual

### ✨ Ventaja del Enfoque Unificado
- **Consistencia**: Global setup siempre se ejecuta
- **Simplicidad**: Un solo archivo de configuración
- **Flexibilidad**: Los proyectos deciden si usar o no el estado guardado

## 📝 Tipos de Tests

### Tests de Login (TC014+)
- Validan credenciales inválidas
- Validan credenciales válidas
- Verifican mensajes de error
- No usan autenticación previa

### Tests Autenticados
- Usan el estado de autenticación del global setup
- Pueden navegar directamente a páginas protegidas
- Más rápidos al no requerir login manual

## 🎯 Ventajas de Esta Estructura

1. **Separación clara**: Tests de login vs tests autenticados
2. **Performance**: Tests autenticados son más rápidos
3. **Mantenibilidad**: Cada tipo de test tiene su configuración
4. **Escalabilidad**: Fácil agregar nuevos tests de cualquier tipo
5. **Flexibilidad**: Ejecutar solo el tipo de test necesario

## Setup Inicial

1. Install dependencies:
```bash
npm install
```

2. Configure credenciales en:
```bash
cp app-configEXAMPLE.json app-config.json
```

3. Ejecutar tests:
```bash
npm run test:all
```