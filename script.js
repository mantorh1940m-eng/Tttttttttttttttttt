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
