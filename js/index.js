
// 获取DOM元素
const studyInput = document.getElementById('studyInput');
const submitBtn = document.getElementById('submitBtn');
const recordsList = document.getElementById('recordsList');

// 密钥验证函数
function verifyKey() {
  const key = prompt('请输入操作密钥:');
  return key === 'ningyan';
}

// 删除记录
function deleteRecord(timestamp) {
  // 验证密钥
  if (!verifyKey()) {
    alert('密钥错误，无法删除记录！');
    return;
  }

  if (confirm('确定要删除这条记录吗？')) {
    let records = JSON.parse(localStorage.getItem('studyRecords') || '[]');
    // 过滤掉要删除的记录（通过timestamp唯一标识）
    records = records.filter(record => record.timestamp !== timestamp);
    localStorage.setItem('studyRecords', JSON.stringify(records));
    // 重新加载记录列表
    loadRecords();
  }
}

// 加载历史记录
function loadRecords() {
  const records = JSON.parse(localStorage.getItem('studyRecords') || '[]');
  recordsList.innerHTML = '';

  // 按日期倒序显示
  records.reverse().forEach(record => {
    const li = document.createElement('li');

    // 创建记录内容容器
    const recordContent = document.createElement('div');
    recordContent.className = 'record-content';

    // 创建日期元素
    const dateSpan = document.createElement('div');
    dateSpan.className = 'record-date';
    dateSpan.textContent = record.date;

    // 创建内容元素
    const contentSpan = document.createElement('div');
    contentSpan.className = 'record-text';
    contentSpan.textContent = record.content;

    // 将日期和内容添加到容器
    recordContent.appendChild(dateSpan);
    recordContent.appendChild(contentSpan);

    // 创建删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function () {
      deleteRecord(record.timestamp);
    };

    // 添加元素到li
    li.appendChild(recordContent);
    li.appendChild(deleteBtn);

    recordsList.appendChild(li);
  });
}

// 保存记录到本地存储
function saveRecord(content) {
  const today = new Date();
  const dateStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  const records = JSON.parse(localStorage.getItem('studyRecords') || '[]');
  records.push({
    date: dateStr,
    content: content,
    timestamp: today.getTime()
  });

  localStorage.setItem('studyRecords', JSON.stringify(records));
}

// 保存指定日期的记录
function saveRecordWithDate(dateStr, content) {
  const records = JSON.parse(localStorage.getItem('studyRecords') || '[]');

  // 检查是否已存在相同日期和内容的记录
  const existingRecord = records.find(record =>
    record.date === dateStr && record.content === content
  );

  if (!existingRecord) {
    // 创建指定日期的Date对象
    const dateParts = dateStr.split('-');
    const recordDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    records.push({
      date: dateStr,
      content: content,
      timestamp: recordDate.getTime()
    });

    localStorage.setItem('studyRecords', JSON.stringify(records));
    return true;
  }
  return false;
}

// 提交按钮点击事件
submitBtn.addEventListener('click', function () {
  const content = studyInput.value.trim();
  if (content) {
    // 验证密钥
    if (verifyKey()) {
      saveRecord(content);
      loadRecords();
      studyInput.value = ''; // 清空输入框
      alert('记录添加成功！棒棒哒！');
    } else {
      alert('密钥错误，无法提交记录！');
    }
  } else {
    alert('请输入学习内容！');
  }
});

// 按Enter键也可以提交
studyInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    submitBtn.click();
  }
});

// 添加指定的历史记录
function addInitialRecords() {
  // 学习记录数据
  const records = [
    { date: '2025-10-15', content: 'HTML核心：结构，语义标签，媒体，表单' },
    { date: '2025-10-17', content: 'CSS基础：选择器，文本样式' },
    { date: '2025-10-21', content: 'CSS布局：正常布局，flex布局，定位布局，网格布局，多列布局' },
    { date: '2025-10-26', content: 'JavaScript基础语法：数据类型，常量变量，运算符，语句，数组，函数对象' },
    { date: '2025-11-03', content: 'web APIs中DOM与事件' },
    { date: '2025-11-08', content: 'web APIs中BOM' }
  ];

  let addedAny = false;
  const existingRecords = JSON.parse(localStorage.getItem('studyRecords') || '[]');
  
  // 检查是否已有记录，如果没有则添加初始记录
  if (existingRecords.length === 0) {
    records.forEach(record => {
      const added = saveRecordWithDate(record.date, record.content);
      if (added) {
        addedAny = true;
        console.log(`已添加学习记录: ${record.date} ${record.content}`);
      }
    });
    
    if (addedAny) {
      console.log('已添加所有初始学习记录');
    }
  } else {
    console.log('已有学习记录，跳过初始记录添加');
  }
}

// 页面加载时显示历史记录并添加初始记录
window.addEventListener('load', function () {
  addInitialRecords();
  loadRecords();
});

// 调整SVG圆形元素属性以适应移动端
function adjustCircleProperties() {
  const isMobile = window.innerWidth <= 480;
  const circleElements = document.querySelectorAll('.circle-bg, .circle-progress-bar');

  circleElements.forEach(circle => {
    if (isMobile) {
      // 移动端：设置cx=30, cy=30, r=25
      circle.setAttribute('cx', '30');
      circle.setAttribute('cy', '30');
      circle.setAttribute('r', '25');

      // 对于进度条，重新计算stroke-dasharray (2 * π * r)
      if (circle.classList.contains('circle-progress-bar')) {
        const circumference = 2 * Math.PI * 25;
        circle.setAttribute('stroke-dasharray', circumference.toString());

        // 根据data-percent属性重新计算stroke-dashoffset
        const percent = parseFloat(circle.getAttribute('data-percent'));
        const offset = circumference * (1 - percent / 100);
        circle.setAttribute('stroke-dashoffset', offset.toString());
      }
    } else {
      // 桌面端：恢复默认值 cx=60, cy=60, r=50
      circle.setAttribute('cx', '60');
      circle.setAttribute('cy', '60');
      circle.setAttribute('r', '50');

      // 对于进度条，恢复默认的stroke-dasharray
      if (circle.classList.contains('circle-progress-bar')) {
        const circumference = 2 * Math.PI * 50; // 314.16
        circle.setAttribute('stroke-dasharray', circumference.toString());

        // 根据data-percent属性重新计算stroke-dashoffset
        const percent = parseFloat(circle.getAttribute('data-percent'));
        const offset = circumference * (1 - percent / 100);
        circle.setAttribute('stroke-dashoffset', offset.toString());
      }
    }
  });
}

// 页面加载完成后执行
window.addEventListener('load', adjustCircleProperties);
// 监听窗口大小变化
window.addEventListener('resize', adjustCircleProperties);
