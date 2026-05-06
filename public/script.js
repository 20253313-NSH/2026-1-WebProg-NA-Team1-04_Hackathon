document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/api/feedbacks';

    const writeForm = document.getElementById('writeForm'); 
    const studentList = document.getElementById('studentFeedbackList');
    const teacherList = document.getElementById('feedbackList'); 
    const sortByLikesBtn = document.getElementById('sortByLikesBtn'); 
    const sortByLatestBtn = document.getElementById('sortByLatestBtn');

    if (writeForm) {
        writeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const content = document.getElementById('feedbackInput').value;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content })
                });

                if (response.ok) {
                    alert('성공적으로 등록되었습니다!');
                    location.href = 'student.html';
            } catch (err) {
                console.error('등록 실패:', err);
            }
        });
    }

  

    let feedbackData = [];

    async function fetchFeedbacks() {
        try {
            const response = await fetch(API_URL);
            feedbackData = await response.json();
            
          
            if (studentList) renderStudentView(feedbackData);
            if (teacherList) renderTeacherView(feedbackData);
        } catch (err) {
            console.error('조회 실패:', err);
        }
    }

    // 학생용 화면 렌더링
    function renderStudentView(data) {
        studentList.innerHTML = '';
        document.getElementById('totalCount').textContent = `총 ${data.length}개`;

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feedback-card';
            card.innerHTML = `
                <p class="feedback-text">${item.content}</p>
                <button class="like-btn" onclick="handleLike('${item._id}')">
                    공감 ${item.likes || 0}
                </button>
            `;
            studentList.appendChild(card);
        });
    }

    // 교수용 화면 렌더링
    function renderTeacherView(data) {
        teacherList.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feedback-card';
            card.innerHTML = `
                <div class="feedback-info">
                    <p class="feedback-text">${item.content}</p>
                    <span class="like-count">공감: ${item.likes || 0}개</span>
                </div>
                <div class="feedback-actions">
                    <button class="delete-btn" onclick="handleDelete('${item._id}')">🗑️ 삭제</button>
                </div>
            `;
            teacherList.appendChild(card);
        });
    }


    window.handleLike = async (id) => {
        try {
            // PATCH 메서드로 특정 아이디의 likes를 1 증가시킴
            await fetch(`${API_URL}/like/${id}`, { method: 'PATCH' });
            fetchFeedbacks(); // 새로고침 없이 데이터 갱신
        } catch (err) {
            console.error('공감 처리 오류:', err);
        }
    };


    window.handleDelete = async (id) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchFeedbacks();
        } catch (err) {
            console.error('삭제 처리 오류:', err);
        }
    };

    if (sortByLikesBtn) {
        sortByLikesBtn.onclick = () => {
            const sorted = [...feedbackData].sort((a, b) => (b.likes || 0) - (a.likes || 0));
            renderTeacherView(sorted);
            sortByLikesBtn.classList.add('active');
            sortByLatestBtn.classList.remove('active');
        };
    }
    if (sortByLatestBtn) {
        sortByLatestBtn.onclick = () => {
            const sorted = [...feedbackData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            renderTeacherView(sorted);
            sortByLatestBtn.classList.add('active');
            sortByLikesBtn.classList.remove('active');
        };
    }


    if (studentList || teacherList) fetchFeedbacks();
});
