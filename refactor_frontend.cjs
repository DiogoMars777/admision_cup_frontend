const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'packages');

const map = {
    // P1 CU01
    'p1-seguridad-acceso/pages/LoginPage.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/pages/LoginPage.jsx',
    'p1-seguridad-acceso/pages/ForgotPasswordPage.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/pages/ForgotPasswordPage.jsx',
    'p1-seguridad-acceso/pages/ResetPasswordPage.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/pages/ResetPasswordPage.jsx',
    'p1-seguridad-acceso/pages/VerifyCodePage.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/pages/VerifyCodePage.jsx',
    'p1-seguridad-acceso/pages/UsuariosPage.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/pages/UsuariosPage.jsx',
    'p1-seguridad-acceso/pages/RolesPage.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/pages/RolesPage.jsx',
    'p1-seguridad-acceso/services/authService.js': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/services/authService.js',
    'p1-seguridad-acceso/services/usuarioService.js': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/services/usuarioService.js',
    'p1-seguridad-acceso/services/rolService.js': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/services/rolService.js',
    'p1-seguridad-acceso/components/LoginForm.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/components/LoginForm.jsx',
    'p1-seguridad-acceso/components/ForgotPasswordForm.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/components/ForgotPasswordForm.jsx',
    'p1-seguridad-acceso/components/ResetPasswordForm.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/components/ResetPasswordForm.jsx',
    'p1-seguridad-acceso/components/VerifyCodeForm.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/components/VerifyCodeForm.jsx',
    'p1-seguridad-acceso/components/UsuarioTable.jsx': 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/components/UsuarioTable.jsx',

    // P1 CU16
    'p1-seguridad-acceso/pages/BitacoraPage.jsx': 'P1_GestionDeSeguridadYAcceso/CU16_GestionarBitacora/pages/BitacoraPage.jsx',
    'p1-seguridad-acceso/services/bitacoraService.js': 'P1_GestionDeSeguridadYAcceso/CU16_GestionarBitacora/services/bitacoraService.js',
    'p1-seguridad-acceso/components/BitacoraFilters.jsx': 'P1_GestionDeSeguridadYAcceso/CU16_GestionarBitacora/components/BitacoraFilters.jsx',
    'p1-seguridad-acceso/components/BitacoraStatsCards.jsx': 'P1_GestionDeSeguridadYAcceso/CU16_GestionarBitacora/components/BitacoraStatsCards.jsx',
    'p1-seguridad-acceso/components/BitacoraTable.jsx': 'P1_GestionDeSeguridadYAcceso/CU16_GestionarBitacora/components/BitacoraTable.jsx',

    // P1 Pendientes
    'p1-seguridad-acceso/pages/DashboardPage.jsx': 'P1_GestionDeSeguridadYAcceso/Pendientes/pages/DashboardPage.jsx',

    // P2 CU2
    'p2-postulantes/pages/InicioPostulantePage.jsx': 'P2_GestionDePostulantes/CU2_RegistrarPostulante/pages/InicioPostulantePage.jsx',
    'p2-postulantes/pages/ListaPostulantesPage.jsx': 'P2_GestionDePostulantes/CU2_RegistrarPostulante/pages/ListaPostulantesPage.jsx',
    'p2-postulantes/pages/PostulanteDocentePage.jsx': 'P2_GestionDePostulantes/CU2_RegistrarPostulante/pages/PostulanteDocentePage.jsx',
    'p2-postulantes/services/postulanteService.js': 'P2_GestionDePostulantes/CU2_RegistrarPostulante/services/postulanteService.js',
    'p2-postulantes/services/aspiranteDocenteService.js': 'P2_GestionDePostulantes/CU2_RegistrarPostulante/services/aspiranteDocenteService.js',

    // P2 CU3
    'p2-postulantes/pages/RequisitosPage.jsx': 'P2_GestionDePostulantes/CU3_GestionarRequisitos/pages/RequisitosPage.jsx',
    'p2-postulantes/services/requisitoService.js': 'P2_GestionDePostulantes/CU3_GestionarRequisitos/services/requisitoService.js',

    // P2 Pendientes
    'p2-postulantes/pages/DocumentosPage.jsx': 'P2_GestionDePostulantes/Pendientes/pages/DocumentosPage.jsx',
    'p2-postulantes/pages/PagosPage.jsx': 'P2_GestionDePostulantes/Pendientes/pages/PagosPage.jsx',

    // P3 CU6
    'p3-academico/pages/MateriasPage.jsx': 'P3_GestionAcademicaBase/CU6_GestionarMaterias/pages/MateriasPage.jsx',
    'p3-academico/services/materiaService.js': 'P3_GestionAcademicaBase/CU6_GestionarMaterias/services/materiaService.js',

    // P3 CU7
    'p3-academico/pages/DocentesPage.jsx': 'P3_GestionAcademicaBase/CU7_GestionarDocentes/pages/DocentesPage.jsx',
    'p3-academico/pages/InicioDocentePage.jsx': 'P3_GestionAcademicaBase/CU7_GestionarDocentes/pages/InicioDocentePage.jsx',
    'p3-academico/services/docenteService.js': 'P3_GestionAcademicaBase/CU7_GestionarDocentes/services/docenteService.js',

    // P3 CU8
    'p3-academico/pages/GruposPage.jsx': 'P3_GestionAcademicaBase/CU8_GestionarGrupos/pages/GruposPage.jsx',
    'p3-academico/services/grupoService.js': 'P3_GestionAcademicaBase/CU8_GestionarGrupos/services/grupoService.js',

    // P3 CU9
    'p3-academico/pages/AulasPage.jsx': 'P3_GestionAcademicaBase/CU9_GestionarAulas/pages/AulasPage.jsx',
    'p3-academico/services/aulaService.js': 'P3_GestionAcademicaBase/CU9_GestionarAulas/services/aulaService.js',

    // P3 Pendientes
    'p3-academico/pages/CarrerasPage.jsx': 'P3_GestionAcademicaBase/Pendientes/pages/CarrerasPage.jsx',
    'p3-academico/pages/GestionAcademicaPage.jsx': 'P3_GestionAcademicaBase/Pendientes/pages/GestionAcademicaPage.jsx',
    'p3-academico/services/carreraService.js': 'P3_GestionAcademicaBase/Pendientes/services/carreraService.js',
    'p3-academico/services/gestionAcademicaService.js': 'P3_GestionAcademicaBase/Pendientes/services/gestionAcademicaService.js',

    'p1-seguridad-acceso/routes.jsx': 'routes.jsx'
};

Object.entries(map).forEach(([oldPath, newPath]) => {
    const fullOldPath = path.join(srcDir, oldPath);
    const fullNewPath = path.join(srcDir, newPath);
    if (fs.existsSync(fullOldPath)) {
        fs.mkdirSync(path.dirname(fullNewPath), { recursive: true });
        fs.renameSync(fullOldPath, fullNewPath);
        console.log(`Moved ${oldPath} to ${newPath}`);
    } else {
        console.warn(`File not found: ${oldPath}`);
    }
});

// Update imports
const replaceMap = [
    // P1
    { old: 'p1-seguridad-acceso/pages', new: 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/pages' },
    { old: 'p1-seguridad-acceso/services', new: 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/services' },
    { old: 'p1-seguridad-acceso/components', new: 'P1_GestionDeSeguridadYAcceso/CU01_GestionDeUsuariosYAutenticacion/components' },
    
    // Manual overrides for specific files
    { old: '../p1-seguridad-acceso/pages/BitacoraPage', new: '../P1_GestionDeSeguridadYAcceso/CU16_GestionarBitacora/pages/BitacoraPage' },
    { old: '../services/bitacoraService', new: '../services/bitacoraService' }, // If within same folder it might break or stay same.
    // Let's use a simpler approach: regex replace the file base names everywhere
];

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const allFiles = walk(path.join(__dirname, 'src'));

// This is a naive replace, we will rewrite imports based on mapping
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    Object.entries(map).forEach(([oldPath, newPath]) => {
        const oldFileNoExt = path.basename(oldPath, path.extname(oldPath));
        const newFileNoExt = path.basename(newPath, path.extname(newPath));
        
        // Very brute force: just replace the relative paths
        // Let's replace 'p1-seguridad-acceso/...' with 'P1_GestionDeSeguridadYAcceso/...'
        const oldPrefix = oldPath.split('/')[0]; // p1-seguridad-acceso
        const oldSuffix = oldPath.split('/').slice(1).join('/'); // pages/LoginPage.jsx
        const oldSuffixNoExt = oldSuffix.replace(/\.jsx?$/, ''); // pages/LoginPage
        
        const newPrefix = newPath.split('/')[0]; // P1_Gestion...
        const newSuffix = newPath.split('/').slice(1).join('/'); // CU01.../pages/LoginPage.jsx
        if (newSuffix) {
            const newSuffixNoExt = newSuffix.replace(/\.jsx?$/, '');
            
            content = content.replace(new RegExp(`\\.\\./${oldPrefix}/${oldSuffixNoExt}`, 'g'), `../${newPrefix}/${newSuffixNoExt}`);
            content = content.replace(new RegExp(`\\.\\./\\.\\./${oldPrefix}/${oldSuffixNoExt}`, 'g'), `../../${newPrefix}/${newSuffixNoExt}`);
            content = content.replace(new RegExp(`\\.\\.\\/\\.\\.\\/\\.\\.\\/${oldPrefix}/${oldSuffixNoExt}`, 'g'), `../../../${newPrefix}/${newSuffixNoExt}`);
        } else {
            // For routes.jsx which becomes routes.jsx in root of packages
            content = content.replace(new RegExp(`\\.\\./${oldPrefix}/routes`, 'g'), `./routes`);
        }
    });
    
    // Also internal relative imports inside the moved files:
    // If a component in P1/CU01 imports a service in P1/CU01:
    // old: import authService from '../services/authService'
    // new: import authService from '../services/authService' (same if relative to CU01)
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated imports in ${file}`);
    }
});

// Remove empty directories
['p1-seguridad-acceso', 'p2-postulantes', 'p3-academico'].forEach(d => {
    const p = path.join(srcDir, d);
    if(fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
});

console.log('Done refactoring frontend');
