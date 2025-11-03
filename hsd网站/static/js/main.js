// QHSF-HSD 主要JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initScrollEffects();
    initFormValidation();
    initTooltips();
    initAnimations();
    initAdminPageTransition();
});

// 导航栏功能
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // 滚动时改变导航栏样式（已移除动画）
    window.addEventListener('scroll', function() {
        // 滚动效果已移除
    });
    
    // 移动端菜单点击关闭
    if (navbarCollapse) {
        navbarCollapse.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    }
}

// 滚动效果
function initScrollEffects() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'auto',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
        
        // 实时验证
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    });
}

// 字段验证
function validateField(field) {
    const isValid = field.checkValidity();
    
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
    
    return isValid;
}

// 初始化工具提示
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// 初始化动画（已移除）
function initAnimations() {
    // 动画逻辑已移除
}

// 工具函数
const utils = {
    // 显示加载状态
    showLoading: function(element) {
        element.classList.add('loading');
        element.disabled = true;
    },
    
    // 隐藏加载状态
    hideLoading: function(element) {
        element.classList.remove('loading');
        element.disabled = false;
    },
    
    // 显示消息
    showMessage: function(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
            
            // 自动隐藏
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
    },
    
    // 格式化日期
    formatDate: function(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            locale: 'zh-CN'
        };
        return new Date(date).toLocaleDateString('zh-CN', options);
    },
    
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// API 请求封装
const api = {
    // 基础请求方法
    request: async function(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const config = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || '请求失败');
            }
            
            return data;
        } catch (error) {
            console.error('API请求错误:', error);
            throw error;
        }
    },
    
    // GET 请求
    get: function(url) {
        return this.request(url);
    },
    
    // POST 请求
    post: function(url, data) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    
    // PUT 请求
    put: function(url, data) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    
    // DELETE 请求
    delete: function(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
};

// 加载更多学生数据
function loadMoreStudents(page = 1) {
    utils.showLoading(document.querySelector('#loadMoreBtn'));
    
    api.get(`/api/students?page=${page}&per_page=12`)
        .then(data => {
            if (data.success) {
                const studentsContainer = document.getElementById('studentsContainer');
                const loadMoreBtn = document.getElementById('loadMoreBtn');
                
                data.students.forEach(student => {
                    const studentCard = createStudentCard(student);
                    studentsContainer.appendChild(studentCard);
                });
                
                // 如果还有更多数据，显示加载更多按钮
                if (data.pagination.page < data.pagination.pages) {
                    loadMoreBtn.style.display = 'block';
                    loadMoreBtn.onclick = () => loadMoreStudents(data.pagination.page + 1);
                } else {
                    loadMoreBtn.style.display = 'none';
                }
                
                // 触发动画
                setTimeout(() => {
                    const newCards = studentsContainer.querySelectorAll('.student-card:not(.animated)');
                    newCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated', 'fade-in-up');
                        }, index * 100);
                    });
                }, 100);
            }
        })
        .catch(error => {
            utils.showMessage('加载失败，请重试', 'danger');
        })
        .finally(() => {
            utils.hideLoading(document.querySelector('#loadMoreBtn'));
        });
}

// 创建学生卡片
function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-md-6 mb-4';
    card.innerHTML = `
        <div class="student-card card h-100 shadow-sm">
            <div class="card-body text-center">
                <div class="student-avatar mx-auto mb-3">
                    ${student.avatar_url ? 
                        `<img src="${student.avatar_url}" alt="${student.name}" class="rounded-circle" style="width: 80px; height: 80px; object-fit: cover;">` :
                        `<div class="avatar-placeholder bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;"><i class="fas fa-user fa-2x"></i></div>`
                    }
                </div>
                <h5 class="card-title fw-bold">${student.name}</h5>
                <p class="text-muted mb-2">${student.university}</p>
                <p class="text-primary mb-2">${student.major}</p>
                <p class="card-text small text-muted">${student.bio || '暂无个人简介'}</p>
                <div class="mt-3">
                    <small class="text-muted">加入时间: ${utils.formatDate(student.join_date)}</small>
                </div>
            </div>
        </div>
    `;
    return card;
}

// 加载统计数据
async function loadStatistics() {
    try {
        const response = await api.get('/api/stats');
        if (response.success) {
            const stats = response.data;
            
            // 直接更新数字
            updateStatNumber('studentsCount', stats.total_students || 0);
            updateStatNumber('universitiesCount', stats.total_universities || 0);
        }
    } catch (error) {
        console.error('加载统计数据失败:', error);
    }
}

// 更新统计数字（已移除动画效果）
function updateStatNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // 直接设置数值，不使用动画
    element.textContent = targetNumber;
}

// 处理新闻订阅
function handleNewsSubscription(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (!email) {
        utils.showMessage('请输入邮箱地址', 'warning');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    utils.showLoading(submitBtn);
    
    api.post('/api/subscribe', { email })
    .then(data => {
        if (data.success) {
            utils.showMessage(data.message, 'success');
            form.reset();
        } else {
            utils.showMessage(data.message, 'danger');
        }
    })
    .catch(error => {
        utils.showMessage('订阅失败，请重试', 'danger');
    })
    .finally(() => {
        utils.hideLoading(submitBtn);
    });
}

// 处理联系表单
function handleContactForm(form) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // 验证必填字段
    for (const [key, value] of Object.entries(data)) {
        if (!value || value.trim() === '') {
            utils.showMessage(`请填写${getFieldName(key)}`, 'warning');
            return;
        }
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    utils.showLoading(submitBtn);
    
    api.post('/api/contact', data)
    .then(response => {
        if (response.success) {
            utils.showMessage(response.message, 'success');
            form.reset();
        } else {
            utils.showMessage(response.message, 'danger');
        }
    })
    .catch(error => {
        utils.showMessage('发送失败，请重试', 'danger');
    })
    .finally(() => {
        utils.hideLoading(submitBtn);
    });
}

// 获取字段中文名称
function getFieldName(field) {
    const fieldNames = {
        name: '姓名',
        email: '邮箱',
        subject: '主题',
        message: '消息内容'
    };
    return fieldNames[field] || field;
}

// 表单处理
const formHandler = {
    // 处理加入申请
    handleJoinForm: async function(formElement) {
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries());
        
        // 验证必填字段
        const requiredFields = ['name', 'email', 'university', 'major'];
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                utils.showMessage(`请填写${field}`, 'warning');
                return false;
            }
        }
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            utils.showMessage('请输入有效的邮箱地址', 'warning');
            return false;
        }
        
        try {
            const submitBtn = formElement.querySelector('button[type="submit"]');
            utils.showLoading(submitBtn);
            
            const result = await api.post('/api/join', data);
            
            if (result.success) {
                utils.showMessage('申请提交成功！我们会尽快与您联系。', 'success');
                formElement.reset();
                formElement.classList.remove('was-validated');
            } else {
                utils.showMessage(result.message || '提交失败，请重试', 'danger');
            }
        } catch (error) {
            utils.showMessage('提交失败，请检查网络连接后重试', 'danger');
        } finally {
            const submitBtn = formElement.querySelector('button[type="submit"]');
            utils.hideLoading(submitBtn);
        }
        
        return true;
    }
};

// 搜索功能
const search = {
    // 初始化搜索
    init: function() {
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', utils.debounce(this.handleSearch, 300));
        }
    },
    
    // 处理搜索
    handleSearch: function(event) {
        const query = event.target.value.trim();
        if (query.length < 2) {
            search.clearResults();
            return;
        }
        
        search.performSearch(query);
    },
    
    // 执行搜索
    performSearch: async function(query) {
        try {
            const results = await api.get(`/api/search?q=${encodeURIComponent(query)}`);
            search.displayResults(results);
        } catch (error) {
            console.error('搜索失败:', error);
        }
    },
    
    // 显示搜索结果
    displayResults: function(results) {
        const resultsContainer = document.querySelector('#searchResults');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-muted">未找到相关结果</p>';
            return;
        }
        
        const html = results.map(item => `
            <div class="search-result-item">
                <h6><a href="${item.url}">${item.title}</a></h6>
                <p class="text-muted small">${item.description}</p>
            </div>
        `).join('');
        
        resultsContainer.innerHTML = html;
    },
    
    // 清空搜索结果
    clearResults: function() {
        const resultsContainer = document.querySelector('#searchResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    }
};

// 导出到全局
window.utils = utils;
window.api = api;
window.formHandler = formHandler;
window.search = search;

// 管理后台页面切换动画（已移除）
function initAdminPageTransition() {
    // 动画逻辑已移除
}

// 添加CSS类用于导航栏滚动效果
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(0, 123, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);