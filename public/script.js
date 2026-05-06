document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('action');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('버튼이 클릭되었습니다.');
    });
  }
});
