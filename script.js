// --- متغيرات أساسية ---
const STORAGE_KEY = 'daily_attendance_records_safe_systems';
const MANAGER_EMAIL = 'manager@yourcompany.com'; // **الرجاء تغيير هذا الإيميل**
let currentLang = 'ar'; // اللغة الافتراضية

// --- قاعدة بيانات الترجمة (Translation Dictionary) ---
const translations = {
    'ar': {
        // نصوص الواجهة
        'page-title': 'نظام بصمة مؤسسة الأنظمة الآمنة',
        'lang-label': 'اختر اللغة:',
        'company-name': 'مؤسسة الأنظمة الآمنة',
        'main-heading': 'بوابة تسجيل الدخول والخروج',
        'current-date-label': 'التاريخ الحالي:',
        'employee-placeholder': 'الاسم الكامل للموظف أو رقم البصمة',
        'btn-punch-in': 'تسجيل الحضور',
        'btn-punch-out': 'تسجيل الانصراف',
        'btn-absent': 'تسجيل الغياب',
        'btn-accomplish': 'إنجاز اليوم',
        'report-button': 'إعداد تقرير اليوم وإرساله للمدير',
        'note-1': '**توضيح:** التقرير لا يرسل تلقائياً. عند الضغط على الزر أعلاه، سيفتح برنامج الإيميل ليقوم المستخدم بإرساله يدوياً.',
        'note-2': '**مهم:** سيسألك المتصفح عن **موقعك الجغرافي** عند الضغط على الزر. يجب الموافقة لتسجيل البصمة.',
        
        // نصوص الإجراءات والرسائل
        'action-punch-in': 'حضور',
        'action-punch-out': 'انصراف',
        'action-absent': 'غياب',
        'action-accomplish': 'إنجاز اليوم',
        'msg-success': (action, name, time) => `تم تسجيل: **${action}** للموظف **${name}** في ${time} من الموقع.`,
        'msg-no-name': 'الرجاء إدخال اسم الموظف أو رقم البصمة أولاً.',
        'msg-locating': 'جارٍ تحديد الموقع الجغرافي...',
        'err-geo-denied': 'خطأ في البصمة: فشل تحديد الموقع. الرجاء السماح للمتصفح باستخدام الموقع الجغرافي لتسجيل البصمة.',
        'err-geo-unavailable': 'خطأ في البصمة: معلومات الموقع غير متاحة حالياً.',
        'err-geo-timeout': 'خطأ في البصمة: انتهت مهلة طلب الموقع الجغرافي.',
        'err-geo-unknown': 'خطأ في البصمة: حدث خطأ غير معروف أثناء طلب الموقع.',
        'err-no-geo': 'المتصفح لا يدعم تحديد الموقع الجغرافي. لا يمكن تسجيل البصمة.',
        'report-subject': (date) => `تقرير حضور وانصراف يوم ${date} - مؤسسة الأنظمة الآمنة`,
        'report-body-header': (date) => `أهلاً بالمدير،\n\nمرفق تقرير الحضور والإحصائيات ليوم: ${date}\n\n---\n\n**الإحصائيات الرئيسية**\n`,
        'report-stats-1': (count) => `* إجمالي الحركات المسجلة: ${count}`,
        'report-stats-2': (count) => `* عدد الحاضرين: ${count}`,
        'report-stats-3': (count) => `* عدد المنصرفين: ${count}`,
        'report-stats-4': (count) => `* عدد مسجلي الإنجاز: ${count}`,
        'report-stats-5': (count) => `* عدد الغائبين: ${count}`,
        'report-details-header': `\n\n---\n\n**تفاصيل السجلات اليومية (الاسم - الإجراء - الوقت - الموقع)**:\n`,
        'location-unrecorded': 'غير مسجل',
        'report-prepared': 'تم تجهيز رابط الإيميل. سيفتح برنامج البريد الإلكتروني الافتراضي الآن.'
    },
    'en': {
        // نصوص الواجهة
        'page-title': 'Safe Systems Attendance System',
        'lang-label': 'Select Language:',
        'company-name': 'Safe Systems Establishment',
        'main-heading': 'Employee Punch-in/out Portal',
        'current-date-label': 'Current Date:',
        'employee-placeholder': 'Full Employee Name or ID',
        'btn-punch-in': 'Punch In',
        'btn-punch-out': 'Punch Out',
        'btn-absent': 'Mark Absent',
        'btn-accomplish': 'Daily Accomplishment',
        'report-button': 'Prepare and Send Daily Report to Manager',
        'note-1': '**Disclaimer:** The report is not sent automatically. Clicking the button will open your default email client for manual submission.',
        'note-2': '**Important:** The browser will ask for your **Geolocation**. You must agree to record the punch.',
        
        // نصوص الإجراءات والرسائل
        'action-punch-in': 'Punch In',
        'action-punch-out': 'Punch Out',
        'action-absent': 'Absent',
        'action-accomplish': 'Accomplishment',
        'msg-success': (action, name, time) => `Successfully recorded: **${action}** for **${name}** at ${time} with Location.`,
        'msg-no-name': 'Please enter the employee name or ID first.',
        'msg-locating': 'Locating Geolocation...',
        'err-geo-denied': 'Punch Error: Location failed. Please allow the browser to use Geolocation to record the punch.',
        'err-geo-unavailable': 'Punch Error: Location information is currently unavailable.',
        'err-geo-timeout': 'Punch Error: Geolocation request timed out.',
        'err-geo-unknown': 'Punch Error: An unknown error occurred while requesting location.',
        'err-no-geo': 'Browser does not support Geolocation. Cannot record punch.',
        'report-subject': (date) => `Attendance Report for ${date} - Safe Systems Establishment`,
        'report-body-header': (date) => `Hello Manager,\n\nPlease find the attendance and statistics report for: ${date}\n\n---\n\n**Key Statistics**\n`,
        'report-stats-1': (count) => `* Total actions recorded: ${count}`,
        'report-stats-2': (count) => `* Employees Punched In: ${count}`,
        'report-stats-3': (count) => `* Employees Punched Out: ${count}`,
        'report-stats-4': (count) => `* Employees Marked Accomplished: ${count}`,
        'report-stats-5': (count) => `* Employees Marked Absent: ${count}`,
        'report-details-header': `\n\n---\n\n**Daily Record Details (Name - Action - Time - Location)**:\n`,
        'location-unrecorded': 'Unrecorded',
        'report-prepared': 'Email link prepared. Your default email client will now open.'
    },
    'ur': {
        // نصوص الواجهة
        'page-title': 'سیف سسٹمز حاضری کا نظام',
        'lang-label': 'زبان منتخب کریں:',
        'company-name': 'سیف سسٹمز اسٹیبلشمنٹ',
        'main-heading': 'ملازمین کے حاضری اور روانگی کا پورٹل',
        'current-date-label': 'موجودہ تاریخ:',
        'employee-placeholder': 'ملازم کا مکمل نام یا ID',
        'btn-punch-in': 'حاضری درج کریں',
        'btn-punch-out': 'روانگی درج کریں',
        'btn-absent': 'غیر حاضری درج کریں',
        'btn-accomplish': 'روزانہ کی کامیابی',
        'report-button': 'آج کی رپورٹ تیار کریں اور مینیجر کو بھیجیں',
        'note-1': '**وضاحت:** رپورٹ خود بخود نہیں بھیجی جاتی۔ بٹن دبانے سے دستی طور پر بھیجنے کے لیے ای میل کلائنٹ کھلے گا۔',
        'note-2': '**اہم:** براؤزر آپ کے **جغرافیائی محل وقوع** کے لیے پوچھے گا۔ حاضری درج کرنے کے لیے منظوری ضروری ہے۔',
        
        // نصوص الإجراءات والرسائل
        'action-punch-in': 'حاضری',
        'action-punch-out': 'روانگی',
        'action-absent': 'غیر حاضری',
        'action-accomplish': 'کامیابی',
        'msg-success': (action, name, time) => `محل وقوع کے ساتھ **${action}** کامیابی سے **${name}** کے لیے ${time} پر ریکارڈ کی گئی۔`,
        'msg-no-name': 'براہ کرم ملازم کا نام یا ID پہلے درج کریں۔',
        'msg-locating': 'جغرافیائی محل وقوع معلوم کیا جا رہا ہے...',
        'err-geo-denied': 'حاضری کی خرابی: محل وقوع ناکام۔ حاضری ریکارڈ کرنے کے لیے براہ کرم محل وقوع کی اجازت دیں۔',
        'err-geo-unavailable': 'حاضری کی خرابی: محل وقوع کی معلومات فی الحال دستیاب نہیں ہے۔',
        'err-geo-timeout': 'حاضری کی خرابی: محل وقوع کی درخواست کا وقت ختم ہو گیا۔',
        'err-geo-unknown': 'حاضری کی خرابی: محل وقوع کی درخواست کرتے وقت ایک نامعلوم خرابی پیش آئی۔',
        'err-no-geo': 'براؤزر جغرافیائی محل وقوع کی حمایت نہیں کرتا۔ حاضری ریکارڈ نہیں کی جا سکتی۔',
        'report-subject': (date) => `حاضری کی رپورٹ ${date} - سیف سسٹمز اسٹیبلشمنٹ`,
        'report-body-header': (date) => `ہیلو مینیجر،\n\nبراہ کرم حاضری اور اعداد و شمار کی رپورٹ دیکھیں: ${date}\n\n---\n\n**اہم اعداد و شمار**\n`,
        'report-stats-1': (count) => `* ریکارڈ کردہ کل کارروائیاں: ${count}`,
        'report-stats-2': (count) => `* حاضر ملازمین: ${count}`,
        'report-stats-3': (count) => `* روانہ ہونے والے ملازمین: ${count}`,
        'report-stats-4': (count) => `* کامیابی درج کرنے والے ملازمین: ${count}`,
        'report-stats-5': (count) => `* غیر حاضر ملازمین: ${count}`,
        'report-details-header': `\n\n---\n\n**روزانہ ریکارڈ کی تفصیلات (نام - کارروائی - وقت - محل وقوع)**:\n`,
        'location-unrecorded': 'غیر ریکارڈ شدہ',
        'report-prepared': 'ای میل کا لنک تیار ہے۔ آپ کا ای میل کلائنٹ اب کھل جائے گا۔'
    }
};

// --- وظائف التخزين والعرض (كما كانت) ---
function getRecords() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    // نستخدم locale اللغة الحالية لتنسيق التاريخ
    dateElement.textContent = today.toLocaleDateString(currentLang === 'ur' ? 'ur-PK' : currentLang === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// --- دالة تحديث جميع نصوص الواجهة ---
function updateUI() {
    const lang = currentLang;
    const t = translations[lang];

    // تحديث اتجاه الصفحة
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr';

    // تحديث النصوص (استنادًا إلى IDs في HTML)
    document.getElementById('page-title').textContent = t['page-title'];
    document.getElementById('lang-label').textContent = t['lang-label'];
    document.getElementById('company-name').textContent = t['company-name'];
    document.getElementById('main-heading').textContent = t['main-heading'];
    document.getElementById('current-date-label').textContent = t['current-date-label'];
    document.getElementById('employee-name').placeholder = t['employee-placeholder'];
    
    document.getElementById('btn-punch-in').textContent = t['btn-punch-in'];
    document.getElementById('btn-punch-out').textContent = t['btn-punch-out'];
    document.getElementById('btn-absent').textContent = t['btn-absent'];
    document.getElementById('btn-accomplish').textContent = t['btn-accomplish'];
    document.getElementById('report-button').textContent = t['report-button'];
    
    // الملاحظات (تستخدم innerHTML بسبب التنسيق Bold)
    document.getElementById('note-1').innerHTML = t['note-1'].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    document.getElementById('note-2').innerHTML = t['note-2'].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    displayCurrentDate();
}

// --- دالة لتغيير اللغة (تستدعى من الـ Dropdown) ---
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('appLang', lang); // حفظ اللغة المفضلة
    updateUI();
}


// --- دالة عرض الرسائل الملونة (محدثة لاستخدام الترجمة) ---
function showMessage(textKey, type) {
    const messageDiv = document.getElementById('message');
    const text = translations[currentLang][textKey] || textKey; // جلب النص المترجم

    messageDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    messageDiv.style.display = 'block';
    // ... (بقية تنسيق الألوان تبقى كما هي) ...
    const successColor = '#006113';
    const errorColor = '#b00000';
    const infoColor = '#00557f';

    if (type === 'success') {
        messageDiv.style.backgroundColor = '#e6ffed';
        messageDiv.style.border = '1px solid #00a651'; 
        messageDiv.style.color = successColor;
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#ffe6e6';
        messageDiv.style.border = '1px solid #d9534f'; 
        messageDiv.style.color = errorColor;
    } else if (type === 'info') {
         messageDiv.style.backgroundColor = '#e6f7ff';
         messageDiv.style.border = '1px solid #004d99'; 
         messageDiv.style.color = infoColor;
    }

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}


// --- وظيفة النجاح عند الحصول على الموقع (محدثة لاستخدام الترجمة) ---
function geolocationSuccess(actionKey, position) {
    const nameInput = document.getElementById('employee-name');
    const name = nameInput.value.trim();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const latitude = position.coords.latitude.toFixed(6);
    const longitude = position.coords.longitude.toFixed(6);
    const locationStr = `خط طول: ${longitude}, خط عرض: ${latitude}`;
    
    // حفظ اسم الإجراء باللغة العربية (للتوحيد في التخزين)
    const actionNameAR = translations['ar'][`action-${actionKey}`];

    const newRecord = {
        name: name,
        action: actionNameAR, // دائماً نحفظ الإجراء باللغة العربية
        date: dateStr,
        time: timeStr,
        location: locationStr
    };

    const records = getRecords();
    records.push(newRecord);
    saveRecords(records);
    
    const actionText = translations[currentLang][`action-${actionKey}`];
    const messageText = translations[currentLang]['msg-success'](actionText, name, timeStr);
    showMessage(messageText, 'success'); // نستخدم النص الكامل مباشرة
    
    nameInput.value = ''; 
}

// --- وظيفة الفشل عند الحصول على الموقع (محدثة لاستخدام الترجمة) ---
function geolocationError(error) {
    let errorKey = 'err-geo-unknown';
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorKey = 'err-geo-denied';
            break;
        case error.POSITION_UNAVAILABLE:
            errorKey = 'err-geo-unavailable';
            break;
        case error.TIMEOUT:
            errorKey = 'err-geo-timeout';
            break;
    }
    showMessage(errorKey, 'error');
}


// --- دالة تسجيل الإجراء (البصمة) (محدثة) ---
function submitAction(actionNameAR) {
    const nameInput = document.getElementById('employee-name');
    const name = nameInput.value.trim();
    
    // تحويل اسم الإجراء العربي إلى المفتاح الإنجليزي المقابل له
    const actionKey = actionNameAR === 'حضور' ? 'punch-in' :
                      actionNameAR === 'انصراف' ? 'punch-out' :
                      actionNameAR === 'غياب' ? 'absent' :
                      'accomplish';

    if (!name) {
        showMessage('msg-no-name', 'error');
        nameInput.focus();
        return;
    }

    if (navigator.geolocation) {
        showMessage('msg-locating', 'info');
        
        navigator.geolocation.getCurrentPosition(
            (position) => geolocationSuccess(actionKey, position),
            geolocationError,
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    } else {
        showMessage('err-no-geo', 'error');
    }
}

// --- دالة إنشاء رابط الإيميل بالتقرير (محدثة لاستخدام الترجمة) ---
function generateReportEmail() {
    const t = translations['ar']; // التقرير دائماً باللغة العربية لتوحيد البيانات للمدير
    const allRecords = getRecords();
    const today = new Date().toISOString().split('T')[0];
    const reportDate = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const dailyRecords = allRecords.filter(record => record.date === today);

    // تحليل الإحصائيات (حالة نهاية اليوم بناءً على آخر إجراء)
    const employeeStatus = {}; 
    dailyRecords.forEach(record => {
        employeeStatus[record.name] = record.action; 
    });

    let attendedCount = 0;
    let leftCount = 0;
    let absentCount = 0;
    let accomplishedCount = 0;

    Object.values(employeeStatus).forEach(status => {
        if (status === t['action-punch-in']) attendedCount++;
        else if (status === t['action-punch-out']) leftCount++;
        else if (status === t['action-absent']) absentCount++;
        else if (status === t['action-accomplish']) accomplishedCount++;
    });

    // بناء نص التقرير (مع استخدام %0A للسطر الجديد)
    let body = t['report-body-header'](reportDate) + '%0A';
    body += t['report-stats-1'](dailyRecords.length) + '%0A';
    body += t['report-stats-2'](attendedCount) + '%0A';
    body += t['report-stats-3'](leftCount) + '%0A';
    body += t['report-stats-4'](accomplishedCount) + '%0A';
    body += t['report-stats-5'](absentCount) + '%0A';
    body += t['report-details-header'] + '%0A';

    dailyRecords.forEach(record => {
        const locationInfo = record.location || t['location-unrecorded']; 
        body += ` - ${record.name} - ${record.action} - ${record.time} (${locationInfo})%0A`;
    });
    
    // بناء رابط mailto
    const subject = encodeURIComponent(t['report-subject'](reportDate));
    const mailtoLink = `mailto:${MANAGER_EMAIL}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    showMessage('report-prepared', 'info');
}

// --- تهيئة التطبيق عند التحميل ---
window.onload = () => {
    // جلب اللغة المحفوظة أو استخدام الافتراضية
    const savedLang = localStorage.getItem('appLang') || 'ar';
    document.getElementById('lang-select').value = savedLang;
    currentLang = savedLang;
    updateUI();
};