
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('action');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('버튼이 클릭되었습니다.');
    });
  }
});
    let feedbackData = [];

    async function fetchFeedbacks() {
        try {
            const response = await fetch(API_URL);
            feedbackData = await response.json();
            
            // 현재 페이지가 학생 페이지인지 교수 페이지인지에 따라 다르게 렌더링
            if (studentList) renderStudentView(feedbackData);
            if (teacherList) renderTeacherView(feedbackData);
        } catch (err) {
            console.error('조회 실패:', err);
        }
    }
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
