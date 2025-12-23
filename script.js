// مصفوفة المقالات - تحاول القراءة من ذاكرة المتصفح أولاً
let articles = JSON.parse(localStorage.getItem('wacut_posts')) || [];

// وظيفة عرض المقالات
function displayArticles() {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    articles.forEach((art, index) => {
        container.innerHTML += `
            <div class="col-md-6">
                <div class="article-card shadow-sm">
                    <div class="d-flex justify-content-between">
                        <h4 class="text-info">${art.title}</h4>
                        <button onclick="deletePost(${index})" class="btn btn-sm text-danger"><i class="fas fa-trash"></i></button>
                    </div>
                    <p class="mt-3 text-light opacity-75">${art.content}</p>
                    <div class="mt-4 d-flex justify-content-between align-items-center">
                        <small class="text-muted">${art.date}</small>
                        <span class="badge bg-secondary">Wacut_e</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// وظيفة نشر مقال جديد
function publishPost() {
    const titleInput = document.getElementById('postTitle');
    const contentInput = document.getElementById('postContent');

    if (titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        alert("أدخل العنوان والمحتوى أولاً!");
        return;
    }

    const newArticle = {
        title: titleInput.value,
        content: contentInput.value,
        date: new Date().toLocaleDateString('ar-EG')
    };

    articles.unshift(newArticle); // إضافة المقال في البداية
    localStorage.setItem('wacut_posts', JSON.stringify(articles)); // حفظ في الذاكرة
    
    titleInput.value = '';
    contentInput.value = '';
    displayArticles();
}

// وظيفة حذف مقال
function deletePost(index) {
    if(confirm("هل أنت متأكد من حذف هذا المقال؟")) {
        articles.splice(index, 1);
        localStorage.setItem('wacut_posts', JSON.stringify(articles));
        displayArticles();
    }
}

// تشغيل العرض عند فتح الصفحة لأول مرة
displayArticles();

let articles = JSON.parse(localStorage.getItem('wacut_pro_posts')) || [];

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    displayArticles(articles);
    updateStats();
    
    // محرك البحث
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = articles.filter(a => 
            a.title.toLowerCase().includes(term) || a.content.toLowerCase().includes(term)
        );
        displayArticles(filtered);
    });
});

function displayArticles(data) {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<div class="text-center p-5 w-100 text-muted"><h4>لا توجد مقالات لعرضها..</h4></div>`;
        return;
    }

    data.forEach((art, index) => {
        container.innerHTML += `
            <div class="col-12 article-item">
                <div class="article-card">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h3 class="text-gradient">${art.title}</h3>
                        <div class="d-flex gap-2">
                            <i class="fas fa-heart like-btn ${art.liked ? 'active' : ''}" onclick="toggleLike(${index})"></i>
                            <i class="fas fa-trash-alt text-muted" onclick="deletePost(${index})" style="cursor:pointer"></i>
                        </div>
                    </div>
                    <p style="white-space: pre-wrap;">${art.content}</p>
                    <div class="mt-4 pt-3 border-top border-secondary d-flex justify-content-between align-items-center small">
                        <span><i class="far fa-user me-1"></i> Wacut_e Admin</span>
                        <span class="text-muted"><i class="far fa-clock me-1"></i> ${art.date}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

function publishPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (!title || !content) {
        showToast("يرجى إكمال البيانات!", "#ff4b2b");
        return;
    }

    const newPost = {
        title,
        content,
        date: new Date().toLocaleString('ar-EG'),
        liked: false
    };

    articles.unshift(newPost);
    saveAndRefresh();
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    showToast("تم نشر المقال بنجاح!", "#00d2ff");
}

function toggleLike(index) {
    articles[index].liked = !articles[index].liked;
    saveAndRefresh();
}

function deletePost(index) {
    if(confirm("حذف هذا المقال نهائياً؟")) {
        articles.splice(index, 1);
        saveAndRefresh();
        showToast("تم الحذف بنجاح", "#333");
    }
}

function saveAndRefresh() {
    localStorage.setItem('wacut_pro_posts', JSON.stringify(articles));
    displayArticles(articles);
    updateStats();
}

function updateStats() {
    document.getElementById('stats').innerText = `مقالات: ${articles.length}`;
}

function showToast(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        gravity: "top",
        position: "left",
        style: { background: color, borderRadius: "10px" }
    }).showToast();
}
