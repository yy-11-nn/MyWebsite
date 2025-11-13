document.addEventListener('DOMContentLoaded', function () {
  const feedbackForm = document.querySelector('.feedback-form');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // 获取表单数据
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const suggestion = formData.get('suggestion');

      // 简单的表单验证
      if (!name || !email || !suggestion) {
        alert('请填写所有必填字段');
        return;
      }

      // 邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('请输入有效的邮箱地址');
        return;
      }

      // 模拟提交成功
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = '提交中...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('感谢您的反馈！我们会尽快处理您的建议。');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }
});