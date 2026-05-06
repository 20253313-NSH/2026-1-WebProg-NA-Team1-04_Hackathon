document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('action');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('버튼이 클릭되었습니다.');
    });
  }
});
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
