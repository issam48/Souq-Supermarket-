const translations = {
  fr: {
    overview: 'APERÇU', dashboard: 'Tableau de bord', pos: 'Point de vente', catalog: 'CATALOGUE', products: 'Produits', inventory: 'Inventaire',
    purchases: 'Achats & fournisseurs', operations: 'OPÉRATIONS', finance: 'Caisse & finances', reports: 'Rapports', settings: 'Paramètres',
    workspace: 'Espace de travail', username: "Nom d'utilisateur", password: 'Mot de passe', today: "Aujourd'hui", last7: '7 derniers jours',
    thisMonth: 'Ce mois', refresh: 'Actualiser', salesRevenue: "Chiffre d'affaires", grossProfit: 'Marge brute', netProfit: 'Résultat net',
    customerDebt: 'Dettes clients', supplierDebt: 'Dettes fournisseurs', beforeExpenses: 'Avant dépenses', afterExpenses: 'Après dépenses',
    salesTrend: 'Tendance des ventes', last7Days: "Chiffre d'affaires · 7 derniers jours", topProducts: 'Meilleures ventes',
    topProductsSubtitle: 'Produits les plus vendus sur la période', viewReport: 'Voir le rapport →', lowStock: 'Stock faible',
    lowStockSubtitle: 'Produits au niveau minimum ou en dessous', expiringProducts: 'Dates proches',
    expiringSubtitle: 'Produits expirés ou à échéance sous 30 jours', viewAll: 'Voir tout', checkout: 'ENCAISSEMENT',
    newSale: 'Nouvelle vente', currentSale: 'Vente en cours', clear: 'Vider', customerOptional: 'Client (facultatif)', walkin: 'Client comptoir',
    discount: 'Remise (DZD)', subtotal: 'Sous-total', totalDue: 'Total à payer', payments: 'Paiements', addPayment: '+ Ajouter',
    remaining: 'Reste à payer', completeSale: 'Valider la vente', catalogManagement: 'CATALOGUE', productsSubtitle: 'Gérez le catalogue, les prix et les seuils de stock.',
    addProduct: 'Ajouter un produit', category: 'Catégorie', product: 'Produit', barcode: 'Code-barres', purchasePrice: "Prix d'achat",
    sellingPrice: 'Prix de vente', stock: 'Stock', actions: 'Actions', stockControl: 'MOUVEMENTS & ALERTES',
    inventorySubtitle: 'Consultez les mouvements et corrigez les quantités disponibles.', adjustStock: 'Ajuster le stock',
    productsBelowMin: 'Produits sous le seuil minimum', next30Days: 'Dans les 30 prochains jours',
    movementHistory: 'Historique des mouvements', date: 'Date', movement: 'Mouvement', quantity: 'Quantité',
    reference: 'Référence', user: 'Utilisateur', note: 'Note', supplyChain: 'APPROVISIONNEMENT',
    purchasesSubtitle: 'Réceptionnez les achats et suivez les soldes fournisseurs.', newPurchase: 'Nouvel achat',
    suppliers: 'Fournisseurs', supplierSubtitle: 'Contacts et soldes à régler', addSupplier: 'Ajouter', customers: 'Clients',
    customerSubtitle: 'Comptes et paiements à recevoir', addCustomer: 'Ajouter', purchaseHistory: "Factures d'achat",
    invoice: 'Facture', supplier: 'Fournisseur', total: 'Total', paid: 'Payé', status: 'Statut', cashAndExpenses: 'TRÉSORERIE',
    financeSubtitle: 'Suivez la caisse, les dépenses et les soldes en cours.', recordExpense: 'Enregistrer une dépense',
    cashRegister: 'Caisse', balances: 'Soldes des comptes', balancesSubtitle: 'Montants à recevoir et à régler',
    expenseHistory: 'Dépenses récentes', description: 'Description', amount: 'Montant', paymentMethod: 'Mode de paiement',
    analytics: 'ANALYSE', reportsSubtitle: 'Analysez les ventes et exportez les résultats.', exportPdf: 'Imprimer / PDF',
    exportExcel: 'Exporter Excel', from: 'Du', to: 'Au', runReport: 'Générer le rapport', sales: 'Ventes', discounts: 'Remises',
    dailyBreakdown: 'Détail quotidien des ventes', salesHistory: 'Ventes récentes', receipt: 'Reçu', customer: 'Client',
    storeSetup: 'CONFIGURATION', settingsSubtitle: "Personnalisez le magasin et la langue de l'interface.",
    storePreferences: 'Préférences du magasin', storePreferencesSubtitle: 'Nom, langue et devise locale',
    storeName: 'Nom du magasin', language: 'Langue', currency: 'Devise', saveSettings: 'Enregistrer les paramètres',
    databaseBackup: 'Sauvegarde des données', backupSubtitle: 'Créer une copie cohérente de la base SQLite locale.',
    createBackup: 'Créer une sauvegarde', userAccounts: 'Comptes utilisateurs', userAccountsSubtitle: 'Accès par rôle au système',
    role: 'Rôle', cashier: 'Caissier', manager: 'Gérant', administrator: 'Administrateur', passwordMin: 'Mot de passe (12 caractères min.)',
    createUser: "Créer l'utilisateur", cancel: 'Annuler', save: 'Enregistrer', goodMorning: 'Bonjour, voici votre activité',
    businessOverview: "VUE D'ENSEMBLE", dashboardSubtitle: 'Suivez les ventes, les stocks et les opérations du magasin.',
    searchProducts: 'Rechercher par nom, SKU ou scanner un code-barres…', searchCatalog: 'Rechercher un produit, SKU ou code-barres',
    productName: 'Nom du produit', editProduct: 'Modifier le produit', newProduct: 'Ajouter un produit',
    productBarcode: 'Code-barres', productSku: 'SKU', purchasePriceDzd: "Prix d'achat (DZD)",
    sellingPriceDzd: 'Prix de vente (DZD)', initialStock: 'Stock initial', minimumStock: 'Seuil de stock', unit: 'Unité',
    variation: 'Variante (optionnel)', expiryDate: "Date d'expiration", categoryName: 'Nom de la catégorie',
    adjustmentTitle: 'Ajustement de stock', adjustmentDelta: 'Variation (+ entrée / − sortie)', adjustmentReason: 'Motif',
    supplierName: 'Nom du fournisseur', customerName: 'Nom du client', phone: 'Téléphone', email: 'E-mail', address: 'Adresse',
    editSupplier: 'Modifier le fournisseur', editCustomer: 'Modifier le client', newSupplier: 'Ajouter un fournisseur',
    newCustomer: 'Ajouter un client', supplierInvoice: 'Numéro de facture', receivedItems: 'Articles reçus',
    addItem: '+ Ajouter un article', initialPayment: 'Paiement initial (DZD)', paymentMethodLabel: 'Mode de paiement',
    supplierPay: 'Payer', customerCollect: 'Encaisser', archiveSupplier: 'Archiver ce fournisseur ?',
    archiveCustomer: 'Archiver ce client ?', expenseDescription: 'Description', expenseCategory: 'Catégorie',
    expenseAmount: 'Montant (DZD)', openingFund: 'Fonds initial (DZD)', countedAmount: 'Montant compté (DZD)',
    openCash: 'Ouvrir la caisse', closeCash: 'Clôturer la caisse', emptyCart: 'Ajoutez des produits à la vente.',
    emptyState: 'Aucune donnée pour le moment.', noSearchResults: 'Aucun produit trouvé.', noStock: 'Stock insuffisant.',
    noStockItem: 'Ce produit est en rupture de stock.', saleSaved: 'Vente enregistrée', confirmSale: 'Vente enregistrée',
    receiptHeading: 'REÇU DE VENTE', receipt: 'Reçu', cashierLabel: 'Caissier', thanks: 'Merci et à bientôt',
    cashMethod: 'Espèces', cardMethod: 'Carte', transferMethod: 'Virement', archiveProductConfirm: 'Archiver ce produit ? Il ne sera plus vendu mais restera dans l’historique.',
    userDeactivated: 'Désactiver cet utilisateur et terminer ses sessions?', archiveSupplierError: 'Réglez le solde fournisseur avant son archivage.',
    archiveCustomerError: 'Réglez le solde client avant son archivage.',
    paidStatus: 'Payée', partialStatus: 'Partiel', unpaidStatus: 'Impayée', refundedStatus: 'Remboursée', voidStatus: 'Annulée',
    purchaseMovement: 'Achat', saleMovement: 'Vente', adjustmentMovement: 'Ajustement', refundMovement: 'Retour', voidMovement: 'Annulation',
    payAction: 'Payer', collectAction: 'Encaisser', refundAction: 'Rembourser', cancelAction: 'Annuler', receiptAction: 'Reçu',
    saveSuccess: 'Enregistrement effectué.', productArchived: 'Produit archivé.', noSuppliersForPurchase: 'Ajoutez un fournisseur avant de saisir un achat.',
    noProductsForPurchase: 'Ajoutez des produits avant de saisir un achat.', userCreated: 'Utilisateur créé.',
    settingsSaved: 'Paramètres enregistrés.', userArchived: 'Utilisateur désactivé.', recordArchived: 'Fiche archivée.',
  },
  ar: {
    overview: 'نظرة عامة', dashboard: 'لوحة التحكم', pos: 'نقطة البيع', catalog: 'الكتالوج', products: 'المنتجات',
    inventory: 'المخزون', purchases: 'المشتريات والموردون', operations: 'العمليات', finance: 'الصندوق والمالية', reports: 'التقارير',
    settings: 'الإعدادات', workspace: 'مساحة العمل', username: 'اسم المستخدم', password: 'كلمة المرور', today: 'اليوم',
    last7: 'آخر 7 أيام', thisMonth: 'هذا الشهر', refresh: 'تحديث', salesRevenue: 'إيرادات المبيعات', grossProfit: 'الربح الإجمالي',
    netProfit: 'صافي الربح', customerDebt: 'ديون العملاء', supplierDebt: 'ديون الموردين', beforeExpenses: 'قبل المصاريف',
    afterExpenses: 'بعد المصاريف', salesTrend: 'اتجاه المبيعات', last7Days: 'الإيرادات · آخر 7 أيام',
    topProducts: 'المنتجات الأكثر مبيعاً', topProductsSubtitle: 'الأكثر مبيعاً خلال الفترة', viewReport: 'عرض التقرير ←',
    lowStock: 'مخزون منخفض', lowStockSubtitle: 'منتجات عند الحد الأدنى أو أقل', expiringProducts: 'منتجات قاربت صلاحيتها',
    expiringSubtitle: 'منتهية أو تنتهي خلال 30 يوماً', viewAll: 'عرض الكل', checkout: 'الدفع', newSale: 'عملية بيع جديدة',
    currentSale: 'البيع الحالي', clear: 'مسح', customerOptional: 'العميل (اختياري)', walkin: 'زبون مباشر',
    discount: 'تخفيض (دج)', subtotal: 'المجموع الفرعي', totalDue: 'المبلغ الإجمالي', payments: 'المدفوعات',
    addPayment: '+ إضافة', remaining: 'المتبقي', completeSale: 'تأكيد البيع', catalogManagement: 'الكتالوج',
    productsSubtitle: 'إدارة المنتجات والأسعار وحدود المخزون.', addProduct: 'إضافة منتج', category: 'الفئة', product: 'المنتج',
    barcode: 'الباركود', purchasePrice: 'سعر الشراء', sellingPrice: 'سعر البيع', stock: 'المخزون', actions: 'إجراءات',
    stockControl: 'الحركات والتنبيهات', inventorySubtitle: 'عرض الحركات وتعديل الكميات المتوفرة.', adjustStock: 'تعديل المخزون',
    productsBelowMin: 'منتجات دون الحد الأدنى', next30Days: 'خلال 30 يوماً القادمة', movementHistory: 'سجل حركات المخزون',
    date: 'التاريخ', movement: 'الحركة', quantity: 'الكمية', reference: 'المرجع', user: 'المستخدم', note: 'ملاحظة',
    supplyChain: 'التوريد', purchasesSubtitle: 'استلام المشتريات ومتابعة أرصدة الموردين.', newPurchase: 'شراء جديد',
    suppliers: 'الموردون', supplierSubtitle: 'جهات الاتصال والمبالغ المستحقة', addSupplier: 'إضافة', customers: 'العملاء',
    customerSubtitle: 'الحسابات والمدفوعات المستحقة', addCustomer: 'إضافة', purchaseHistory: 'فواتير الشراء',
    invoice: 'الفاتورة', supplier: 'المورد', total: 'الإجمالي', paid: 'مدفوع', status: 'الحالة', cashAndExpenses: 'الخزينة',
    financeSubtitle: 'متابعة الصندوق والمصاريف والأرصدة.', recordExpense: 'تسجيل مصروف', cashRegister: 'الصندوق',
    balances: 'أرصدة الحسابات', balancesSubtitle: 'المبالغ المستحقة والمطلوب دفعها', expenseHistory: 'المصاريف الأخيرة',
    description: 'الوصف', amount: 'المبلغ', paymentMethod: 'طريقة الدفع', analytics: 'التحليلات',
    reportsSubtitle: 'تحليل المبيعات وتصدير النتائج.', exportPdf: 'طباعة / PDF', exportExcel: 'تصدير Excel',
    from: 'من', to: 'إلى', runReport: 'إنشاء التقرير', sales: 'المبيعات', discounts: 'التخفيضات',
    dailyBreakdown: 'تفصيل المبيعات اليومية', salesHistory: 'المبيعات الأخيرة', receipt: 'الإيصال', customer: 'العميل',
    storeSetup: 'الإعدادات', settingsSubtitle: 'تخصيص المتجر ولغة الواجهة.', storePreferences: 'تفضيلات المتجر',
    storePreferencesSubtitle: 'الاسم واللغة والعملة المحلية', storeName: 'اسم المتجر', language: 'اللغة', currency: 'العملة',
    saveSettings: 'حفظ الإعدادات', databaseBackup: 'نسخ احتياطي للبيانات', backupSubtitle: 'إنشاء نسخة آمنة من قاعدة البيانات المحلية.',
    createBackup: 'إنشاء نسخة احتياطية', userAccounts: 'حسابات المستخدمين', userAccountsSubtitle: 'صلاحيات الوصول حسب الدور',
    role: 'الدور', cashier: 'أمين الصندوق', manager: 'مسير', administrator: 'مدير النظام',
    passwordMin: 'كلمة المرور (12 حرفاً على الأقل)', createUser: 'إنشاء مستخدم', cancel: 'إلغاء', save: 'حفظ',
    goodMorning: 'مرحباً، إليك ملخص نشاطك', businessOverview: 'نظرة عامة', dashboardSubtitle: 'تابع المبيعات والمخزون وعمليات المتجر.',
    searchProducts: 'ابحث بالاسم أو الرمز أو امسح الباركود…', searchCatalog: 'ابحث عن منتج أو رمز أو باركود',
    productName: 'اسم المنتج', editProduct: 'تعديل المنتج', newProduct: 'إضافة منتج',
    productBarcode: 'الباركود', productSku: 'رمز المنتج', purchasePriceDzd: 'سعر الشراء (دج)',
    sellingPriceDzd: 'سعر البيع (دج)', initialStock: 'المخزون الأولي', minimumStock: 'الحد الأدنى للمخزون', unit: 'الوحدة',
    variation: 'النوع أو الحجم (اختياري)', expiryDate: 'تاريخ انتهاء الصلاحية', categoryName: 'اسم الفئة',
    adjustmentTitle: 'تعديل المخزون', adjustmentDelta: 'التغيير (+ إضافة / − إخراج)', adjustmentReason: 'السبب',
    supplierName: 'اسم المورد', customerName: 'اسم العميل', phone: 'الهاتف', email: 'البريد الإلكتروني', address: 'العنوان',
    editSupplier: 'تعديل المورد', editCustomer: 'تعديل العميل', newSupplier: 'إضافة مورد', newCustomer: 'إضافة عميل',
    supplierInvoice: 'رقم الفاتورة', receivedItems: 'المنتجات المستلمة', addItem: '+ إضافة منتج',
    initialPayment: 'الدفعة الأولى (دج)', paymentMethodLabel: 'طريقة الدفع', supplierPay: 'دفع',
    customerCollect: 'تحصيل', archiveSupplier: 'أرشفة هذا المورد؟', archiveCustomer: 'أرشفة هذا العميل؟',
    expenseDescription: 'الوصف', expenseCategory: 'الفئة', expenseAmount: 'المبلغ (دج)',
    openingFund: 'الرصيد الافتتاحي (دج)', countedAmount: 'المبلغ المعدود (دج)', openCash: 'فتح الصندوق',
    closeCash: 'إغلاق الصندوق', emptyCart: 'أضف المنتجات إلى عملية البيع.', emptyState: 'لا توجد بيانات حالياً.',
    noSearchResults: 'لم يتم العثور على منتجات.', noStock: 'المخزون غير كافٍ.', noStockItem: 'هذا المنتج غير متوفر.',
    saleSaved: 'تم تسجيل البيع', confirmSale: 'تم تسجيل البيع', receiptHeading: 'إيصال البيع',
    cashierLabel: 'أمين الصندوق', thanks: 'شكراً لزيارتكم', cashMethod: 'نقداً', cardMethod: 'بطاقة',
    transferMethod: 'تحويل', archiveProductConfirm: 'أرشفة هذا المنتج؟ سيبقى محفوظاً في السجل.',
    userDeactivated: 'تعطيل هذا المستخدم وإنهاء جلساته؟', archiveSupplierError: 'يجب تسوية رصيد المورد قبل الأرشفة.',
    archiveCustomerError: 'يجب تسوية رصيد العميل قبل الأرشفة.',
    paidStatus: 'مدفوع', partialStatus: 'مدفوع جزئياً', unpaidStatus: 'غير مدفوع', refundedStatus: 'مسترجع', voidStatus: 'ملغى',
    purchaseMovement: 'شراء', saleMovement: 'بيع', adjustmentMovement: 'تعديل', refundMovement: 'إرجاع', voidMovement: 'إلغاء',
    payAction: 'دفع', collectAction: 'تحصيل', refundAction: 'استرجاع', cancelAction: 'إلغاء', receiptAction: 'إيصال',
    saveSuccess: 'تم الحفظ بنجاح.', productArchived: 'تمت أرشفة المنتج.', noSuppliersForPurchase: 'أضف مورداً قبل تسجيل عملية شراء.',
    noProductsForPurchase: 'أضف منتجات قبل تسجيل عملية شراء.', userCreated: 'تم إنشاء المستخدم.',
    settingsSaved: 'تم حفظ الإعدادات.', userArchived: 'تم تعطيل المستخدم.', recordArchived: 'تمت أرشفة السجل.',
  },
};

const state = { user: null, locale: 'fr', settings: {}, products: [], customers: [], suppliers: [], cart: [], report: null, page: 'dashboard' };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key) => translations[state.locale]?.[key] || translations.fr[key] || key;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const cents = (value) => Number(value || 0) / 100;
const money = (value) => new Intl.NumberFormat(state.locale === 'ar' ? 'ar-DZ' : 'fr-DZ', { style: 'currency', currency: 'DZD', minimumFractionDigits: 2 }).format(cents(value));
const quantityFmt = (value) => new Intl.NumberFormat(state.locale === 'ar' ? 'ar-DZ' : 'fr-DZ', { maximumFractionDigits: 3 }).format(Number(value || 0));
const dateFmt = (value) => value ? new Date(String(value).replace(' ', 'T') + (String(value).includes('Z') ? '' : 'Z')).toLocaleString(state.locale === 'ar' ? 'ar-DZ' : 'fr-DZ', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
const dateOnly = (value) => value ? String(value).slice(0, 10) : '—';

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  });
  let result;
  try { result = await response.json(); } catch { result = {}; }
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status}).`);
  return result;
}
const send = (method, body) => ({ method, body: JSON.stringify(body) });

function toast(message, error = false) {
  const item = document.createElement('div');
  item.className = `toast${error ? ' error' : ''}`;
  item.textContent = message;
  $('#toast-region').append(item);
  setTimeout(() => item.remove(), 3800);
}
function setBusy(button, busy, label) {
  if (!button) return;
  button.disabled = busy;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = label || '…';
  } else if (button.dataset.originalText) {
    button.textContent = button.dataset.originalText;
    delete button.dataset.originalText;
  }
}
function applyLocale() {
  document.documentElement.lang = state.locale;
  document.documentElement.dir = state.locale === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  if (state.settings.store_name) $('#store-label').textContent = state.settings.store_name;
  $('#today-label').textContent = new Date().toLocaleDateString(state.locale === 'ar' ? 'ar-DZ' : 'fr-DZ', { weekday: 'short', day: 'numeric', month: 'short' });
  if (state.user) $('#page-title').textContent = t(state.page);
}
function showAuth(setup) {
  $('#auth-screen').hidden = false;
  $('#app').hidden = true;
  $('#auth-title').textContent = setup ? 'Configurer votre magasin' : (state.locale === 'ar' ? 'مرحباً بعودتك' : 'Bienvenue');
  $('#auth-hint').textContent = setup
    ? 'Créez le compte administrateur. Choisissez un mot de passe unique de 12 caractères minimum.'
    : (state.locale === 'ar' ? 'سجّل الدخول إلى مساحة عمل متجرك.' : 'Connectez-vous à votre espace de travail.');
  $('#auth-submit').textContent = setup ? 'Créer le compte administrateur' : 'Se connecter';
  $('#auth-form [name=password]').minLength = setup ? 12 : 1;
  $('#auth-form [name=password]').autocomplete = setup ? 'new-password' : 'current-password';
  $('#auth-error').textContent = '';
  $('#auth-form').dataset.setup = String(setup);
}

async function start() {
  try {
    const status = await api('/api/status');
    const cachedUser = await api('/api/me').catch(() => null);
    if (!cachedUser) return showAuth(status.setupRequired);
    state.user = cachedUser.user;
    state.settings = cachedUser.settings || {};
    state.locale = state.settings.locale || 'fr';
    await enterApp();
  } catch (error) {
    showAuth(true);
    $('#auth-error').textContent = `Impossible de joindre le service local : ${error.message}`;
  }
}
async function enterApp() {
  $('#auth-screen').hidden = true;
  $('#app').hidden = false;
  $('#user-name').textContent = state.user.username;
  $('#top-user').textContent = state.user.username;
  $('#user-avatar').textContent = state.user.username.slice(0, 1).toUpperCase();
  $('#user-role').textContent = ({ admin: t('administrator'), manager: t('manager'), cashier: t('cashier') })[state.user.role];
  $$('.admin-only').forEach((el) => { el.hidden = state.user.role !== 'admin'; });
  $$('.manager-only').forEach((el) => { el.hidden = state.user.role === 'cashier'; });
  $$('.nav-link[data-page="settings"]').forEach((el) => { el.hidden = state.user.role === 'cashier'; });
  applyLocale();
  await loadPage(state.page);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
}

$('#auth-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = $('#auth-submit');
  setBusy(button, true);
  try {
    const data = Object.fromEntries(new FormData(form));
    const result = await api(form.dataset.setup === 'true' ? '/api/setup' : '/api/login', send('POST', data));
    state.user = result.user;
    state.settings = await api('/api/settings');
    state.locale = state.settings.locale || 'fr';
    await enterApp();
  } catch (error) {
    $('#auth-error').textContent = error.message;
  } finally { setBusy(button, false, ''); }
});
$('#logout').addEventListener('click', async () => {
  await api('/api/logout', { method: 'POST' }).catch(() => {});
  state.user = null;
  state.cart = [];
  showAuth(false);
});

$$('[data-page]').forEach((button) => button.addEventListener('click', () => loadPage(button.dataset.page)));
$('#dashboard-period').addEventListener('change', () => loadDashboard().catch(showError));
$('#pos-search').addEventListener('input', debounce(() => searchProducts().catch(showError), 170));
$('#pos-search').addEventListener('keydown', async (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  const search = event.currentTarget.value.trim();
  if (!search) return;
  try {
    const matches = await api(`/api/products?search=${encodeURIComponent(search)}`);
    const exact = matches.find((product) => product.barcode === search || product.sku === search);
    if (exact) {
      addToCart(exact);
      event.currentTarget.value = '';
      $('#pos-results').replaceChildren();
    } else if (matches.length === 1) {
      addToCart(matches[0]);
      event.currentTarget.value = '';
      $('#pos-results').replaceChildren();
    } else if (!matches.length) toast(t('noSearchResults'), true);
  } catch (error) { showError(error); }
});
$('#product-search').addEventListener('input', debounce(() => loadProducts().catch(showError), 180));
$('#pos-discount').addEventListener('input', renderCart);
$('#clear-cart').addEventListener('click', () => { state.cart = []; renderCart(); });
$('#add-payment').addEventListener('click', () => addPaymentLine());
$('#checkout').addEventListener('click', checkout);
$('#settings-form').addEventListener('submit', saveSettings);
$('#user-form').addEventListener('submit', createUser);
$('#record-form').addEventListener('submit', submitDialog);
$('#dialog-fields').addEventListener('click', (event) => {
  if (event.target.closest('[data-remove-purchase-line]')) event.target.closest('.purchase-form-line')?.remove();
  if (event.target.closest('[data-add-purchase-line]')) addPurchaseFormLine();
});
$('#report-from').value = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
$('#report-to').value = new Date().toISOString().slice(0, 10);

function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}
function showError(error) { toast(error?.message || String(error), true); }

async function loadPage(page) {
  if (page === 'settings' && state.user?.role === 'cashier') return toast('Accès réservé à la gestion.', true);
  state.page = page;
  $$('.page').forEach((el) => el.classList.toggle('active', el.id === `page-${page}`));
  $$('.nav-link[data-page]').forEach((el) => el.classList.toggle('active', el.dataset.page === page));
  $('#page-title').textContent = t(page);
  try {
    if (page === 'dashboard') await loadDashboard();
    if (page === 'pos') await loadPos();
    if (page === 'products') await loadProducts();
    if (page === 'inventory') await loadInventory();
    if (page === 'purchases') await loadPurchases();
    if (page === 'finance') await loadFinance();
    if (page === 'reports') { await runReport(); await loadSales(); }
    if (page === 'settings') await loadSettings();
  } catch (error) { showError(error); }
}

async function loadDashboard() {
  const data = await api(`/api/dashboard?period=${$('#dashboard-period').value}`);
  $('#metric-revenue').textContent = money(data.sales.revenue);
  $('#metric-sales').textContent = `${data.sales.count} ${t('sales').toLowerCase()}`;
  $('#metric-profit').textContent = money(data.gross_profit);
  $('#metric-net').textContent = money(data.net_profit);
  $('#metric-debt').textContent = money(data.customer_debt);
  $('#metric-supplier-debt').textContent = `${t('supplierDebt')} · ${money(data.supplier_debt)}`;
  renderChart(data.chart);
  $('#bestsellers').innerHTML = data.bestsellers.length ? data.bestsellers.map((item, index) => `<div class="rank-row"><span class="rank-num">${index + 1}</span><div class="rank-meta"><b>${escapeHtml(item.name)}</b><small>${quantityFmt(item.quantity)} ${t('quantity').toLowerCase()}</small></div><span class="rank-value">${money(item.revenue)}</span></div>`).join('') : emptyRow();
  $('#low-stock-list').innerHTML = data.low_stock.length ? data.low_stock.map((item) => `<div class="alert-row"><i class="alert-dot"></i><div class="alert-meta"><b>${escapeHtml(item.name)}</b><small>${t('stock')}: ${quantityFmt(item.stock)} ${escapeHtml(item.unit)}</small></div><span class="alert-value">${t('lowStock')}</span></div>`).join('') : emptyRow();
  $('#expiry-list').innerHTML = data.expiring.length ? data.expiring.map((item) => `<div class="alert-row"><i class="alert-dot ${item.expiry_date < new Date().toISOString().slice(0, 10) ? 'red' : ''}"></i><div class="alert-meta"><b>${escapeHtml(item.name)}</b><small>${t('stock')}: ${quantityFmt(item.stock)}</small></div><span class="alert-value">${escapeHtml(item.expiry_date)}</span></div>`).join('') : emptyRow();
  const totalAlerts = data.low_stock.length + data.expiring.length;
  $('#alert-count').hidden = totalAlerts === 0;
  $('#inventory-low-count').textContent = data.low_stock.length;
  $('#inventory-expiry-count').textContent = data.expiring.length;
}
function renderChart(rows) {
  const values = rows.map((row) => row.revenue);
  if (!values.length) { $('#sales-chart').innerHTML = `<div class="empty-state">${emptyText()}</div>`; return; }
  const width = 620, height = 145, left = 38, right = 6, top = 12, bottom = 22;
  const max = Math.max(...values, 100);
  const points = rows.map((row, i) => {
    const x = left + (rows.length === 1 ? 0 : i * (width - left - right) / (rows.length - 1));
    return { x, y: top + (height - top - bottom) * (1 - row.revenue / max), label: dateOnly(row.day), value: row.revenue };
  });
  const path = points.map((point, index) => `${index ? 'L' : 'M'}${point.x},${point.y}`).join(' ');
  const grid = [0, 1, 2].map((i) => {
    const y = top + i * (height - top - bottom) / 2;
    return `<line class="chart-grid" x1="${left}" x2="${width}" y1="${y}" y2="${y}"/><text class="chart-label" x="0" y="${y + 3}">${Math.round(cents(max * (1 - i / 2))).toLocaleString('fr-DZ')}</text>`;
  }).join('');
  const dots = points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="3" fill="#148873"><title>${escapeHtml(point.label)} · ${escapeHtml(money(point.value))}</title></circle><text class="chart-label" text-anchor="middle" x="${point.x}" y="${height}">${escapeHtml(point.label.slice(5))}</text>`).join('');
  $('#sales-chart').innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(t('salesTrend'))}">${grid}<path d="${path}" fill="none" stroke="#1b9a7e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`;
}
function emptyText() { return t('emptyState'); }
function emptyRow() { return `<div class="empty-state">${emptyText()}</div>`; }
function statusLabel(status) {
  const key = ({ paid: 'paidStatus', partial: 'partialStatus', unpaid: 'unpaidStatus', refunded: 'refundedStatus', void: 'voidStatus' })[status];
  return key ? t(key) : status;
}
function movementLabel(type) {
  const key = ({ purchase: 'purchaseMovement', sale: 'saleMovement', adjustment: 'adjustmentMovement', refund: 'refundMovement', void: 'voidMovement' })[type];
  return key ? t(key) : type;
}

async function loadPos() {
  const [customers, cash] = await Promise.all([api('/api/customers'), api('/api/cash')]);
  state.customers = customers;
  $('#pos-customer').innerHTML = `<option value="">${escapeHtml(t('walkin'))}</option>${customers.map((customer) => `<option value="${customer.id}">${escapeHtml(customer.name)}</option>`).join('')}`;
  $('#pos-cash-badge').className = `badge ${cash.session ? 'status-good' : 'status-warn'}`;
  $('#pos-cash-badge').textContent = cash.session ? `${t('cashRegister')} · ${money(cash.session.current_amount)}` : (state.locale === 'ar' ? 'الصندوق مغلق' : 'Caisse fermée');
  $('#pos-search').focus();
  await searchProducts();
  renderCart();
}
async function searchProducts() {
  const query = $('#pos-search').value.trim();
  const rows = await api(`/api/products?search=${encodeURIComponent(query)}`);
  $('#pos-results').innerHTML = rows.length ? rows.slice(0, 60).map((product) => `<button class="product-result" data-add-product="${product.id}"><b>${escapeHtml(product.name)}</b><span>${escapeHtml(product.barcode || product.sku || product.category_name || '')} · ${t('stock')}: ${quantityFmt(product.stock)} ${escapeHtml(product.unit)}</span><strong>${money(product.selling_price)}</strong></button>`).join('') : `<div class="empty-state">${emptyText()}</div>`;
  $$('#pos-results [data-add-product]').forEach((button) => button.addEventListener('click', () => {
    const product = rows.find((row) => row.id === Number(button.dataset.addProduct));
    if (product) addToCart(product);
    $('#pos-search').focus();
  }));
}
function addToCart(product) {
  const current = state.cart.find((line) => line.id === product.id);
  if (current) {
    if (current.quantity + 1 > product.stock) return toast(t('noStock'), true);
    current.quantity += 1;
  } else {
    if (product.stock < 1) return toast(t('noStockItem'), true);
    state.cart.push({ id: product.id, name: product.name, stock: product.stock, unit: product.unit, price: product.selling_price, quantity: 1 });
  }
  renderCart();
}
function renderCart() {
  $('#cart-lines').innerHTML = state.cart.length ? state.cart.map((line, index) => `<div class="cart-line"><div><b>${escapeHtml(line.name)}</b><small>${money(line.price)} / ${escapeHtml(line.unit)}</small></div><input type="number" min="0.001" max="${line.stock}" step="0.001" value="${line.quantity}" data-cart-qty="${index}" aria-label="${escapeHtml(t('quantity'))}"><strong>${money(Math.round(line.price * line.quantity))}</strong><button class="remove-line" data-remove-cart="${index}" aria-label="×">×</button></div>`).join('') : `<div class="empty-state">${t('emptyCart')}</div>`;
  $$('#cart-lines [data-cart-qty]').forEach((input) => input.addEventListener('change', () => {
    const item = state.cart[Number(input.dataset.cartQty)];
    const newQuantity = Number(input.value);
    if (!newQuantity || newQuantity > item.stock) { input.value = item.quantity; return toast(t('noStock'), true); }
    item.quantity = newQuantity;
    renderCart();
  }));
  $$('#cart-lines [data-remove-cart]').forEach((button) => button.addEventListener('click', () => { state.cart.splice(Number(button.dataset.removeCart), 1); renderCart(); }));
  const subtotal = state.cart.reduce((sum, line) => sum + Math.round(line.price * line.quantity), 0);
  const discount = Math.min(Math.round(Number($('#pos-discount').value || 0) * 100), subtotal);
  const total = subtotal - discount;
  const paid = $$('#payment-lines [data-payment-amount]').reduce((sum, input) => sum + Math.round(Number(input.value || 0) * 100), 0);
  $('#cart-count').textContent = `${state.cart.length} ${state.locale === 'ar' ? 'منتج' : (state.cart.length === 1 ? 'article' : 'articles')}`;
  $('#cart-subtotal').textContent = money(subtotal);
  $('#cart-discount').textContent = `− ${money(discount)}`;
  $('#cart-total').textContent = money(total);
  $('#cart-remaining').textContent = money(Math.max(total - paid, 0));
  $('#checkout').disabled = !state.cart.length;
}
function addPaymentLine(method = 'cash', amount = null) {
  const line = document.createElement('div');
  line.className = 'payment-line';
  line.innerHTML = `<select aria-label="${escapeHtml(t('paymentMethod'))}"><option value="cash">${escapeHtml(t('cashMethod'))}</option><option value="card">${escapeHtml(t('cardMethod'))}</option><option value="transfer">${escapeHtml(t('transferMethod'))}</option></select><input data-payment-amount type="number" min="0" step="0.01" placeholder="0,00" aria-label="${escapeHtml(t('amount'))}"><button type="button" aria-label="×">×</button>`;
  $('select', line).value = method;
  if (amount !== null) $('[data-payment-amount]', line).value = amount;
  $('[data-payment-amount]', line).addEventListener('input', renderCart);
  $('button', line).addEventListener('click', () => { line.remove(); renderCart(); });
  $('#payment-lines').append(line);
  renderCart();
}
async function checkout() {
  if (!state.cart.length) return;
  const button = $('#checkout');
  setBusy(button, true, '…');
  try {
    const payments = $$('#payment-lines .payment-line').map((line) => ({ method: $('select', line).value, amount: $('[data-payment-amount]', line).value })).filter((p) => Number(p.amount) > 0);
    const result = await api('/api/sales', send('POST', {
      items: state.cart.map((line) => ({ product_id: line.id, quantity: line.quantity })),
      customer_id: $('#pos-customer').value || null,
      discount: $('#pos-discount').value,
      payments,
    }));
    const sale = await api(`/api/sales?receipt=${encodeURIComponent(result.receipt)}`).catch(() => null);
    state.cart = [];
    $('#pos-discount').value = '0';
    $('#payment-lines').replaceChildren();
    renderCart();
    await printReceipt({ ...(result.sale || sale || { receipt_number: result.receipt, total: 0 }), items: result.items || [] }, result.receipt);
    toast(`${t('confirmSale')} · ${result.receipt}`);
    await loadPos();
  } catch (error) { toast(error.message, true); } finally { setBusy(button, false, 'Valider la vente'); }
}
async function printReceipt(sale, receipt) {
  const currency = money(sale.total || 0);
  const items = sale.items || [];
  $('#receipt-print').innerHTML = `<h1>${escapeHtml(state.settings.store_name || 'Souq')}</h1><p class="receipt-title">${escapeHtml(t('receiptHeading'))}</p><div class="receipt-meta">${escapeHtml(t('receipt'))} : ${escapeHtml(receipt)}<br>${escapeHtml(t('date'))} : ${escapeHtml(new Date().toLocaleString(state.locale === 'ar' ? 'ar-DZ' : 'fr-DZ'))}<br>${escapeHtml(t('cashierLabel'))} : ${escapeHtml(state.user.username)}</div><table><thead><tr><th>${escapeHtml(t('product'))}</th><th>${escapeHtml(t('quantity'))}</th><th>${escapeHtml(t('sellingPrice'))}</th><th>${escapeHtml(t('total'))}</th></tr></thead><tbody>${items.map((item) => `<tr><td>${escapeHtml(item.product_name)}</td><td>${quantityFmt(item.quantity)}</td><td>${money(item.unit_price)}</td><td>${money(item.line_total)}</td></tr>`).join('')}</tbody></table><div class="receipt-total">${escapeHtml(t('total'))} : ${currency}</div><p class="receipt-thanks">${escapeHtml(t('thanks'))}</p>`;
  document.body.classList.add('printing-receipt');
  window.print();
  document.body.classList.remove('printing-receipt');
  $('#receipt-print').replaceChildren();
}

async function loadProducts() {
  const [products, categories] = await Promise.all([api(`/api/products?search=${encodeURIComponent($('#product-search').value.trim())}`), api('/api/categories')]);
  state.products = products;
  state.categories = categories;
  $('#products-table').innerHTML = products.length ? products.map((product) => `<tr>
    <td class="td-main">${escapeHtml(product.name)}${product.variation ? `<small class="sub-cell">${escapeHtml(product.variation)}</small>` : ''}</td>
    <td>${escapeHtml(product.barcode || '—')}<small class="sub-cell">${escapeHtml(product.sku || '')}</small></td>
    <td>${escapeHtml(product.category_name || '—')}</td><td>${money(product.purchase_price)}</td><td>${money(product.selling_price)}</td>
    <td><span class="status-badge ${product.stock <= product.minimum_stock ? 'status-warn' : 'status-good'}">${quantityFmt(product.stock)} ${escapeHtml(product.unit)}</span></td>
    <td>${state.user.role !== 'cashier' ? `<div class="row-actions"><button class="row-action" data-edit-product="${product.id}">✎</button><button class="row-action" data-adjust-product="${product.id}">±</button><button class="row-action" data-delete-product="${product.id}">×</button></div>` : '—'}</td>
  </tr>`).join('') : `<tr><td colspan="7">${emptyRow()}</td></tr>`;
  $$('[data-edit-product]').forEach((button) => button.addEventListener('click', () => editProduct(Number(button.dataset.editProduct))));
  $$('[data-adjust-product]').forEach((button) => button.addEventListener('click', () => openAdjustment(Number(button.dataset.adjustProduct))));
  $$('[data-delete-product]').forEach((button) => button.addEventListener('click', () => archiveProduct(Number(button.dataset.deleteProduct))));
  const categorySelect = $('#dialog-fields [name=category_id]');
  if (categorySelect) categorySelect.innerHTML = `<option value="">—</option>${categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`).join('')}`;
}

function field(name, label, type = 'text', value = '', options = {}) {
  const safeValue = escapeHtml(value);
  const attributes = `${options.required ? 'required' : ''} ${options.min !== undefined ? `min="${options.min}"` : ''} ${options.step ? `step="${options.step}"` : ''} ${options.maxlength ? `maxlength="${options.maxlength}"` : ''} ${options.placeholder ? `placeholder="${escapeHtml(options.placeholder)}"` : ''}`;
  if (type === 'select') {
    const choices = options.choices || [];
    return `<label class="${options.className || ''}"><span>${escapeHtml(label)}</span><select name="${escapeHtml(name)}" ${attributes}>${choices.map((choice) => `<option value="${escapeHtml(choice.value)}" ${String(choice.value) === String(value) ? 'selected' : ''}>${escapeHtml(choice.label)}</option>`).join('')}</select></label>`;
  }
  if (type === 'textarea') return `<label class="${options.className || ''}"><span>${escapeHtml(label)}</span><textarea name="${escapeHtml(name)}" ${attributes}>${safeValue}</textarea></label>`;
  return `<label class="${options.className || ''}"><span>${escapeHtml(label)}</span><input name="${escapeHtml(name)}" type="${type}" value="${safeValue}" ${attributes}></label>`;
}

function openDialog(title, fieldsHtml, submit, options = {}) {
  $('#dialog-eyebrow').textContent = options.eyebrow || 'SOUQ · GESTION';
  $('#dialog-title').textContent = title;
  $('#dialog-fields').innerHTML = fieldsHtml;
  $('#dialog-submit').textContent = options.submitLabel || t('save');
  $('#dialog-submit').hidden = options.noSubmit || false;
  state.dialogSubmit = submit;
  if (!$('#record-dialog').open) $('#record-dialog').showModal();
}

async function submitDialog(event) {
  event.preventDefault();
  if (!state.dialogSubmit) return;
  const form = event.currentTarget;
  const button = $('#dialog-submit');
  setBusy(button, true, '…');
  try {
    const result = await state.dialogSubmit(form, new FormData(form));
    $('#record-dialog').close();
    state.dialogSubmit = null;
    if (result !== false) toast(t('saveSuccess'));
    await loadPage(state.page);
  } catch (error) { showError(error); } finally { setBusy(button, false); }
}

function productFields(product = {}) {
  const categories = (state.categories || []).map((category) => ({ value: category.id, label: category.name }));
  return [
    field('name', t('productName'), 'text', product.name || '', { required: true, maxlength: 160 }),
    field('category_id', t('category'), 'select', product.category_id || '', { choices: [{ value: '', label: '—' }, ...categories] }),
    field('barcode', t('productBarcode'), 'text', product.barcode || '', { maxlength: 80 }),
    field('sku', t('productSku'), 'text', product.sku || '', { maxlength: 80 }),
    field('purchase_price', t('purchasePriceDzd'), 'number', cents(product.purchase_price || 0), { min: 0, step: '.01', required: true }),
    field('selling_price', t('sellingPriceDzd'), 'number', cents(product.selling_price || 0), { min: 0, step: '.01', required: true }),
    ...(!product.id ? [field('stock', t('initialStock'), 'number', '0', { min: 0, step: '.001' })] : []),
    field('minimum_stock', t('minimumStock'), 'number', product.minimum_stock || 0, { min: 0, step: '.001' }),
    field('unit', t('unit'), 'text', product.unit || 'piece', { required: true, maxlength: 30 }),
    field('variation', t('variation'), 'text', product.variation || '', { maxlength: 100 }),
    field('expiry_date', t('expiryDate'), 'date', product.expiry_date || ''),
  ].join('');
}
function openProduct(product = null) {
  openDialog(product ? t('editProduct') : t('newProduct'), productFields(product || {}), async (form) => {
    const data = Object.fromEntries(new FormData(form));
    if (product) await api(`/api/products/${product.id}`, send('PUT', data));
    else await api('/api/products', send('POST', data));
  });
}
function editEntity(kind, id) {
  const record = (kind === 'supplier' ? state.suppliers : state.customers).find((item) => item.id === id);
  if (!record) return;
  openDialog(kind === 'supplier' ? t('editSupplier') : t('editCustomer'), entityFields(kind, record), async (form) => {
    await api(`/api/${kind === 'supplier' ? 'suppliers' : 'customers'}/${id}`, send('PUT', Object.fromEntries(new FormData(form))));
  });
}
async function archiveEntity(kind, id) {
  if (!window.confirm(kind === 'supplier' ? t('archiveSupplier') : t('archiveCustomer'))) return;
  try {
    await api(`/api/${kind === 'supplier' ? 'suppliers' : 'customers'}/${id}`, { method: 'DELETE' });
    toast(t('recordArchived'));
    await loadPurchases();
  } catch (error) { showError(error); }
}
function editProduct(id) {
  const product = state.products.find((item) => item.id === id);
  if (!product) return;
  openProduct(product);
}
async function archiveProduct(id) {
  if (!window.confirm(t('archiveProductConfirm'))) return;
  try { await api(`/api/products/${id}`, { method: 'DELETE' }); toast(t('productArchived')); await loadProducts(); } catch (error) { showError(error); }
}
function openCategory() {
  openDialog(t('category'), field('name', t('categoryName'), 'text', '', { required: true, maxlength: 80 }), async (form) => {
    await api('/api/categories', send('POST', Object.fromEntries(new FormData(form))));
  });
}
function openAdjustment(productId = null) {
  const products = state.products.length ? state.products : [];
  const choices = products.map((product) => ({ value: product.id, label: `${product.name} · ${quantityFmt(product.stock)} ${product.unit}` }));
  openDialog(t('adjustmentTitle'), [
    field('product_id', t('product'), 'select', productId || '', { required: true, choices }),
    field('delta', t('adjustmentDelta'), 'number', '', { required: true, step: '.001', placeholder: '-1 ou 5' }),
    field('note', t('adjustmentReason'), 'text', '', { required: true, maxlength: 200, className: 'span-2' }),
  ].join(''), async (form) => {
    await api('/api/inventory/adjustments', send('POST', Object.fromEntries(new FormData(form))));
  });
}

async function loadInventory() {
  const [alerts, movements, products] = await Promise.all([api('/api/inventory/alerts'), api('/api/inventory/movements'), api('/api/products')]);
  state.products = products;
  $('#inventory-low-count').textContent = alerts.low_stock.length;
  $('#inventory-expiry-count').textContent = alerts.expiring.length;
  $('#movements-table').innerHTML = movements.length ? movements.map((movement) => `<tr><td>${escapeHtml(dateFmt(movement.created_at))}</td><td class="td-main">${escapeHtml(movement.product_name)}</td><td>${escapeHtml(movementLabel(movement.movement_type))}</td><td><span class="status-badge ${movement.quantity < 0 ? 'status-warn' : 'status-good'}">${movement.quantity > 0 ? '+' : ''}${quantityFmt(movement.quantity)}</span></td><td>${escapeHtml(movement.reference || '—')}</td><td>${escapeHtml(movement.username)}</td><td>${escapeHtml(movement.note || '—')}</td></tr>`).join('') : `<tr><td colspan="7">${emptyRow()}</td></tr>`;
}

function entityFields(kind, record = {}) {
  const nameLabel = kind === 'supplier' ? t('supplierName') : t('customerName');
  return [
    field('name', nameLabel, 'text', record.name || '', { required: true, maxlength: 160 }),
    field('phone', t('phone'), 'tel', record.phone || '', { maxlength: 40 }),
    field('email', t('email'), 'email', record.email || '', { maxlength: 120 }),
    field('address', t('address'), 'text', record.address || '', { maxlength: 240, className: 'span-2' }),
  ].join('');
}
function openEntity(kind) {
  openDialog(kind === 'supplier' ? t('newSupplier') : t('newCustomer'), entityFields(kind), async (form) => {
    const data = Object.fromEntries(new FormData(form));
    const result = await api(`/api/${kind === 'supplier' ? 'suppliers' : 'customers'}`, send('POST', data));
    if (kind === 'customer') state.newCustomerId = result.id;
  });
}

async function loadPurchases() {
  const [suppliers, customers, purchases, products] = await Promise.all([api('/api/suppliers'), api('/api/customers'), api('/api/purchases'), api('/api/products')]);
  state.suppliers = suppliers;
  state.customers = customers;
  state.products = products;
  $('#supplier-list').innerHTML = suppliers.length ? suppliers.map((supplier) => `<div class="entity-row"><span class="entity-avatar">${escapeHtml(supplier.name.slice(0, 1).toUpperCase())}</span><div class="entity-meta"><b>${escapeHtml(supplier.name)}</b><small>${escapeHtml(supplier.phone || supplier.email || '—')}</small></div><span class="entity-balance ${supplier.balance > 0 ? 'owed' : 'clear'}">${money(supplier.balance)}</span>${supplier.balance > 0 && state.user.role !== 'cashier' ? `<button class="text-button" data-pay-supplier="${supplier.id}">${escapeHtml(t('payAction'))}</button>` : ''}${state.user.role !== 'cashier' ? `<button class="row-action" data-edit-supplier="${supplier.id}">✎</button><button class="row-action" data-archive-supplier="${supplier.id}">×</button>` : ''}</div>`).join('') : emptyRow();
  $('#customer-list').innerHTML = customers.length ? customers.map((customer) => `<div class="entity-row"><span class="entity-avatar">${escapeHtml(customer.name.slice(0, 1).toUpperCase())}</span><div class="entity-meta"><b>${escapeHtml(customer.name)}</b><small>${escapeHtml(customer.phone || customer.email || '—')}</small></div><span class="entity-balance ${customer.balance > 0 ? 'owed' : 'clear'}">${customer.balance < 0 ? `${state.locale === 'ar' ? 'رصيد' : 'Avoir'} ${money(-customer.balance)}` : money(customer.balance)}</span>${customer.balance > 0 ? `<button class="text-button" data-pay-customer="${customer.id}">${escapeHtml(t('collectAction'))}</button>` : ''}<button class="row-action" data-edit-customer="${customer.id}">✎</button>${state.user.role !== 'cashier' ? `<button class="row-action" data-archive-customer="${customer.id}">×</button>` : ''}</div>`).join('') : emptyRow();
  $('#purchases-table').innerHTML = purchases.length ? purchases.map((purchase) => `<tr><td>${escapeHtml(dateFmt(purchase.created_at))}</td><td class="td-main">${escapeHtml(purchase.invoice_number)}</td><td>${escapeHtml(purchase.supplier_name)}</td><td>${money(purchase.total)}</td><td>${money(purchase.paid)}</td><td><span class="status-badge ${purchase.status === 'paid' ? 'status-good' : 'status-warn'}">${escapeHtml(statusLabel(purchase.status))}</span></td><td>${purchase.status !== 'paid' && state.user.role !== 'cashier' ? `<button class="row-action" data-pay-supplier="${purchase.supplier_id}">${escapeHtml(t('payAction'))}</button>` : '—'}</td></tr>`).join('') : `<tr><td colspan="7">${emptyRow()}</td></tr>`;
  $$('[data-pay-supplier]').forEach((button) => button.addEventListener('click', () => paySupplier(Number(button.dataset.paySupplier))));
  $$('[data-pay-customer]').forEach((button) => button.addEventListener('click', () => payCustomer(Number(button.dataset.payCustomer))));
  $$('[data-edit-supplier]').forEach((button) => button.addEventListener('click', () => editEntity('supplier', Number(button.dataset.editSupplier))));
  $$('[data-edit-customer]').forEach((button) => button.addEventListener('click', () => editEntity('customer', Number(button.dataset.editCustomer))));
  $$('[data-archive-supplier]').forEach((button) => button.addEventListener('click', () => archiveEntity('supplier', Number(button.dataset.archiveSupplier))));
  $$('[data-archive-customer]').forEach((button) => button.addEventListener('click', () => archiveEntity('customer', Number(button.dataset.archiveCustomer))));
}

function openSupplier() { openEntity('supplier'); }
function openCustomer() { openEntity('customer'); }
function addPurchaseFormLine() {
  const products = state.products || [];
  const choices = products.map((product) => `<option value="${product.id}" data-cost="${cents(product.purchase_price)}">${escapeHtml(product.name)} · ${quantityFmt(product.stock)} ${escapeHtml(product.unit)}</option>`).join('');
  const wrapper = document.createElement('div');
  wrapper.className = 'purchase-form-line span-2';
  wrapper.innerHTML = `<label><span>${escapeHtml(t('product'))}</span><select name="product_id" required>${choices}</select></label><label><span>${escapeHtml(t('quantity'))}</span><input name="quantity" type="number" min=".001" step=".001" value="1" required></label><label><span>${escapeHtml(t('purchasePriceDzd'))}</span><input name="unit_cost" type="number" min="0" step=".01" value="${products.length ? cents(products[0].purchase_price) : 0}" required></label><button type="button" class="icon-button" data-remove-purchase-line aria-label="×">×</button>`;
  $('select', wrapper).addEventListener('change', (event) => {
    const selected = $('option:checked', event.currentTarget);
    $('input[name=unit_cost]', wrapper).value = selected.dataset.cost || '0';
  });
  $('#purchase-lines').append(wrapper);
}
function openPurchase() {
  if (!state.suppliers?.length) return toast(t('noSuppliersForPurchase'), true);
  if (!state.products?.length) return toast(t('noProductsForPurchase'), true);
  const supplierOptions = state.suppliers.map((supplier) => ({ value: supplier.id, label: supplier.name }));
  const fields = `<label><span>${escapeHtml(t('supplier'))}</span><select name="supplier_id" required>${supplierOptions.map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`).join('')}</select></label>
    ${field('invoice_number', t('supplierInvoice'), 'text', '', { required: true, maxlength: 80 })}
    <div class="span-2"><div class="purchase-lines-heading"><b>${escapeHtml(t('receivedItems'))}</b><button type="button" class="text-button" data-add-purchase-line>${escapeHtml(t('addItem'))}</button></div><div id="purchase-lines"></div></div>
    ${field('initial_payment', t('initialPayment'), 'number', '0', { min: 0, step: '.01' })}
    ${field('payment_method', t('paymentMethodLabel'), 'select', 'cash', { choices: [{ value: 'cash', label: t('cashMethod') }, { value: 'card', label: t('cardMethod') }, { value: 'transfer', label: t('transferMethod') }] })}`;
  openDialog('Nouvel achat fournisseur', fields, async (form) => {
    const formData = new FormData(form);
    const items = $$('.purchase-form-line', form).map((line) => ({
      product_id: $('select[name=product_id]', line).value,
      quantity: $('input[name=quantity]', line).value,
      unit_cost: $('input[name=unit_cost]', line).value,
    }));
    await api('/api/purchases', send('POST', {
      supplier_id: formData.get('supplier_id'),
      invoice_number: formData.get('invoice_number'),
      initial_payment: formData.get('initial_payment'),
      payment_method: formData.get('payment_method'),
      items,
    }));
  });
  addPurchaseFormLine();
}
function paySupplier(id) {
  const supplier = state.suppliers.find((item) => item.id === id);
  if (!supplier) return;
  openDialog(`${t('supplierPay')} · ${supplier.name}`, [
    field('amount', `${t('amount')} (${money(supplier.balance)})`, 'number', cents(supplier.balance), { required: true, min: 0.01, step: '.01' }),
    field('method', t('paymentMethodLabel'), 'select', 'cash', { choices: [{ value: 'cash', label: t('cashMethod') }, { value: 'card', label: t('cardMethod') }, { value: 'transfer', label: t('transferMethod') }] }),
  ].join(''), async (form) => api('/api/suppliers/payment', send('POST', { supplier_id: id, ...Object.fromEntries(new FormData(form)) })));
}
function payCustomer(id) {
  const customer = state.customers.find((item) => item.id === id);
  if (!customer) return;
  openDialog(`${t('customerCollect')} · ${customer.name}`, [
    field('amount', `${t('amount')} (${money(customer.balance)})`, 'number', cents(customer.balance), { required: true, min: 0.01, step: '.01' }),
    field('method', t('paymentMethodLabel'), 'select', 'cash', { choices: [{ value: 'cash', label: t('cashMethod') }, { value: 'card', label: t('cardMethod') }, { value: 'transfer', label: t('transferMethod') }] }),
  ].join(''), async (form) => api('/api/customers/payment', send('POST', { customer_id: id, ...Object.fromEntries(new FormData(form)) })));
}

async function loadFinance() {
  const [cash, data, expenses, customers, suppliers] = await Promise.all([api('/api/cash'), api('/api/dashboard?period=month'), api('/api/expenses'), api('/api/customers'), api('/api/suppliers')]);
  $('#finance-customer-debt').textContent = money(data.customer_debt);
  $('#finance-supplier-debt').textContent = money(data.supplier_debt);
  $('#cash-status').className = `badge ${cash.session ? 'status-good' : 'status-neutral'}`;
  $('#cash-status').textContent = cash.session ? (state.locale === 'ar' ? 'مفتوح' : 'Ouverte') : (state.locale === 'ar' ? 'مغلقة' : 'Fermée');
  $('#cash-description').textContent = cash.session ? `${state.locale === 'ar' ? 'افتتحت' : 'Ouverte'} ${dateFmt(cash.session.opened_at)}` : (state.locale === 'ar' ? 'لا توجد جلسة صندوق نشطة' : 'Aucune session de caisse active');
  $('#cash-details').innerHTML = cash.session ? `<div class="cash-amount">${money(cash.session.current_amount)}</div><div class="cash-caption">${state.locale === 'ar' ? 'الرصيد النقدي المتوقع' : 'Solde espèces actuel'}</div>` : `<div class="empty-state">${state.locale === 'ar' ? 'افتح الصندوق لبدء تسجيل المدفوعات النقدية.' : 'Ouvrez la caisse pour enregistrer les mouvements en espèces.'}</div>`;
  $('#cash-actions').innerHTML = cash.session
    ? (state.user.role !== 'cashier' ? `<div class="cash-actions"><button class="button button-secondary" data-action="close-cash">${state.locale === 'ar' ? 'إغلاق الصندوق' : 'Clôturer la caisse'}</button></div>` : '')
    : `<div class="cash-actions"><button class="button button-primary" data-action="open-cash">${state.locale === 'ar' ? 'فتح الصندوق' : 'Ouvrir la caisse'}</button></div>`;
  $('#expenses-table').innerHTML = expenses.length ? expenses.map((item) => `<tr><td>${escapeHtml(dateFmt(item.created_at))}</td><td class="td-main">${escapeHtml(item.description)}</td><td>${escapeHtml(item.category)}</td><td>${money(item.amount)}</td><td>${escapeHtml(item.method)}</td><td>${escapeHtml(item.username)}</td></tr>`).join('') : `<tr><td colspan="6">${emptyRow()}</td></tr>`;
  state.customers = customers;
  state.suppliers = suppliers;
}

async function loadSales() {
  const sales = await api('/api/sales');
  $('#sales-table').innerHTML = sales.length ? sales.map((sale) => `<tr><td class="td-main">${escapeHtml(sale.receipt_number)}</td><td>${escapeHtml(dateFmt(sale.created_at))}</td><td>${escapeHtml(sale.customer_name || '—')}</td><td>${money(sale.total)}</td><td>${money(sale.paid)}</td><td><span class="status-badge ${sale.status === 'paid' ? 'status-good' : sale.status === 'partial' ? 'status-warn' : 'status-neutral'}">${escapeHtml(statusLabel(sale.status))}</span></td><td>${!['void', 'refunded'].includes(sale.status) ? `${sale.paid > 0 && state.user.role === 'cashier' ? '' : `<button class="row-action" data-refund-sale="${sale.id}">${escapeHtml(sale.paid > 0 ? t('refundAction') : t('cancelAction'))}</button>`}<button class="row-action" data-reprint-sale="${sale.id}">${escapeHtml(t('receiptAction'))}</button>` : '—'}</td></tr>`).join('') : `<tr><td colspan="7">${emptyRow()}</td></tr>`;
  $$('[data-refund-sale]').forEach((button) => button.addEventListener('click', () => refundSale(Number(button.dataset.refundSale), button.textContent.includes('Annuler') ? 'cancel' : 'refund')));
  $$('[data-reprint-sale]').forEach((button) => button.addEventListener('click', async () => {
    try {
      const id = Number(button.dataset.reprintSale);
      const sale = sales.find((item) => item.id === id);
      const items = await api(`/api/sales/${id}/items`);
      await printReceipt({ ...sale, items }, sale.receipt_number);
    } catch (error) { showError(error); }
  }));
}
async function refundSale(id, action) {
  const confirmText = action === 'cancel' ? 'Annuler cette vente et remettre les produits en stock ?' : 'Rembourser cette vente et remettre les produits en stock ?';
  if (!window.confirm(confirmText)) return;
  try { await api(`/api/sales/${id}/${action}`, { method: 'POST' }); toast('Opération terminée.'); await loadSales(); } catch (error) { showError(error); }
}

function openExpense() {
  openDialog(t('recordExpense'), [
    field('description', t('expenseDescription'), 'text', '', { required: true, maxlength: 160 }),
    field('category', t('expenseCategory'), 'text', '', { required: true, maxlength: 80 }),
    field('amount', t('expenseAmount'), 'number', '', { required: true, min: '.01', step: '.01' }),
    field('method', t('paymentMethodLabel'), 'select', 'cash', { choices: [{ value: 'cash', label: t('cashMethod') }, { value: 'card', label: t('cardMethod') }, { value: 'transfer', label: t('transferMethod') }] }),
  ].join(''), async (form) => api('/api/expenses', send('POST', Object.fromEntries(new FormData(form)))));
}
function openCash(opening = true) {
  openDialog(opening ? t('openCash') : t('closeCash'), field(opening ? 'opening_amount' : 'closing_amount', opening ? t('openingFund') : t('countedAmount'), 'number', '0', { min: 0, step: '.01', required: true }), async (form) => {
    const data = Object.fromEntries(new FormData(form));
    if (opening) await api('/api/cash/open', send('POST', data));
    else {
      const result = await api('/api/cash/close', send('POST', data));
      toast(`Écart de caisse : ${money(result.difference)}`);
    }
  });
}

async function runReport() {
  const report = await api(`/api/reports/sales?from=${encodeURIComponent($('#report-from').value)}&to=${encodeURIComponent($('#report-to').value)}`);
  state.report = report;
  $('#report-sales-count').textContent = report.summary.sales_count;
  $('#report-revenue').textContent = money(report.summary.revenue);
  $('#report-discounts').textContent = money(report.summary.discounts);
  $('#report-profit').textContent = money(report.summary.gross_profit);
  $('#report-table').innerHTML = report.rows.length ? report.rows.map((row) => `<tr><td>${escapeHtml(row.day)}</td><td>${row.sales_count}</td><td>${money(row.revenue)}</td><td>${money(row.discounts)}</td><td>${money(row.gross_profit)}</td></tr>`).join('') : `<tr><td colspan="5">${emptyRow()}</td></tr>`;
}
function exportCsv() {
  if (!state.report) return;
  const toDzd = (amount) => (Number(amount || 0) / 100).toFixed(2);
  const rows = [['Date', 'Ventes', "Chiffre d'affaires (DZD)", 'Remises (DZD)', 'Marge brute (DZD)'], ...state.report.rows.map((row) => [row.day, row.sales_count, toDzd(row.revenue), toDzd(row.discounts), toDzd(row.gross_profit)])];
  const csv = '\uFEFF' + rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `souq-ventes-${state.report.from}-${state.report.to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
function printReport() {
  document.body.classList.add('printing-report');
  window.print();
  document.body.classList.remove('printing-report');
}

async function loadSettings() {
  state.settings = await api('/api/settings');
  const form = $('#settings-form');
  form.elements.store_name.value = state.settings.store_name || 'Souq';
  form.elements.locale.value = state.settings.locale || 'fr';
  $('#backup-location').textContent = state.locale === 'ar' ? 'يتم إنشاء النسخة الاحتياطية محلياً على جهاز المتجر.' : 'Les sauvegardes sont stockées localement dans le dossier data/backups.';
  if (state.user.role === 'admin') {
    const users = await api('/api/users');
    $('#user-list').innerHTML = users.map((user) => `<div class="entity-row"><span class="entity-avatar">${escapeHtml(user.username.slice(0, 1).toUpperCase())}</span><div class="entity-meta"><b>${escapeHtml(user.username)}</b><small>${escapeHtml(user.role)} · ${user.active ? 'Actif' : 'Désactivé'}</small></div>${user.active && user.id !== state.user.id ? `<button class="text-button" data-deactivate-user="${user.id}">Désactiver</button>` : ''}</div>`).join('');
    $$('[data-deactivate-user]').forEach((button) => button.addEventListener('click', async () => {
      if (!window.confirm('Désactiver cet utilisateur et terminer ses sessions ?')) return;
      try { await api(`/api/users/${button.dataset.deactivateUser}`, { method: 'PATCH' }); toast(t('userArchived')); await loadSettings(); } catch (error) { showError(error); }
    }));
    const backups = await api('/api/backup/list');
    $('#backup-result').innerHTML = backups.length ? backups.slice(0, 5).map((file) => `<div class="backup-file">${escapeHtml(file)}</div>`).join('') : '';
  }
}
async function saveSettings(event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);
    state.settings = await api('/api/settings', send('PUT', values));
    state.locale = state.settings.locale;
    applyLocale();
    toast(t('settingsSaved'));
  } catch (error) { showError(error); }
}
async function createUser(event) {
  event.preventDefault();
  try {
    await api('/api/users', send('POST', Object.fromEntries(new FormData(event.currentTarget))));
    event.currentTarget.reset();
    toast(t('userCreated'));
    await loadSettings();
  } catch (error) { showError(error); }
}
async function createBackup() {
  try {
    const result = await api('/api/backup');
    toast(`Sauvegarde créée : ${result.file}`);
    await loadSettings();
  } catch (error) { showError(error); }
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'refresh-dashboard') loadDashboard().catch(showError);
  if (action === 'new-product') loadProducts().then(() => openProduct()).catch(showError);
  if (action === 'new-category') openCategory();
  if (action === 'new-adjustment') api('/api/products').then((products) => { state.products = products; openAdjustment(); }).catch(showError);
  if (action === 'new-supplier') openSupplier();
  if (action === 'new-customer') openCustomer();
  if (action === 'new-purchase') loadPurchases().then(openPurchase).catch(showError);
  if (action === 'new-expense') openExpense();
  if (action === 'open-cash') openCash(true);
  if (action === 'close-cash') openCash(false);
  if (action === 'run-report') runReport().catch(showError);
  if (action === 'print-report') printReport();
  if (action === 'export-csv') exportCsv();
  if (action === 'create-backup') createBackup();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'F2') {
    event.preventDefault();
    loadPage('pos');
  }
  if (event.key === 'Escape' && $('#record-dialog').open) $('#record-dialog').close();
});

start();
