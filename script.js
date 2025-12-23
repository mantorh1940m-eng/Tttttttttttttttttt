
// بيانات الموقع
let posts = JSON.parse(localStorage.getItem('wacut_data')) || [];

// تعريف العناصر
const publishBtn = document.getElementById('publishBtn');
const titleInput = document.getElementById('postTitle');
const contentInput = document.getElementById('postContent');
const articlesList = document.getElementById('articlesList');
const countDisplay = document.getElementById('countDisplay');

// وظيفة عرض البيانات
function renderPosts() {
    articlesList.innerHTML = '';
    posts.forEach((post, index) => {
        const item = `
            <div class="col-12">
                <div class="article-card shadow-sm">
                    <div class="d-flex justify-content-between">
                        <h5 class="text-primary fw-bold">${post.title}</h5>
                        <button onclick="removePost(${index})" class="btn btn-sm text-danger">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <p class="mt-2" style="white-space: pre-wrap;">${post.content}</p>
                    <div class="text-muted extra-small mt-3 border-top pt-2">
                        <i class="far fa-clock me-1"></i> ${post.date}
                    </div>
                </div>
            </div>`;
        articlesList.insertAdjacentHTML('beforeend', item);
    });
    countDisplay.innerText = `المقالات: ${posts.length}`;
    localStorage.setItem('wacut_data', JSON.stringify(posts));
}

// وظيفة النشر عند الضغط على الزر
publishBtn.addEventListener('click', function() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") {
        alert("يرجى كتابة العنوان والمحتوى!");
        return;
    }

    const newPost = {
        title: title,
        content: content,
        date: new Date().toLocaleString('ar-EG')
    };

    posts.unshift(newPost);
    renderPosts();

    // تفريغ الحقول
    titleInput.value = '';
    contentInput.value = '';
});

// وظيفة الحذف
window.removePost = function(index) {
    if(confirm("هل أنت متأكد من الحذف؟")) {
        posts.splice(index, 1);
        renderPosts();
    }
};

// تشغيل العرض الأولي
renderPosts();
