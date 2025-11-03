#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
API测试脚本
用于测试QHSF-HSD网站的所有API端点
"""

import requests
import json
from datetime import datetime

# 基础URL
BASE_URL = 'http://127.0.0.1:5000'

def test_api_endpoint(endpoint, method='GET', data=None):
    """测试API端点"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == 'GET':
            response = requests.get(url)
        elif method == 'POST':
            response = requests.post(url, json=data)
        
        print(f"\n{'='*50}")
        print(f"测试端点: {method} {endpoint}")
        print(f"状态码: {response.status_code}")
        
        if response.status_code == 200:
            try:
                result = response.json()
                print(f"响应数据: {json.dumps(result, ensure_ascii=False, indent=2)}")
                return True
            except:
                print(f"响应内容: {response.text[:200]}...")
                return True
        else:
            print(f"错误: {response.text}")
            return False
            
    except Exception as e:
        print(f"\n{'='*50}")
        print(f"测试端点: {method} {endpoint}")
        print(f"错误: {str(e)}")
        return False

def main():
    """主测试函数"""
    print("开始测试QHSF-HSD网站API...")
    
    # 测试用例
    test_cases = [
        # GET端点测试
        ('/api/events', 'GET'),
        ('/api/events?page=1&per_page=5', 'GET'),
        ('/api/events?category=会议', 'GET'),
        ('/api/news', 'GET'),
        ('/api/news?page=1&per_page=5', 'GET'),
        ('/api/news?category=项目动态', 'GET'),
        ('/api/students', 'GET'),
        ('/api/students?page=1&per_page=5', 'GET'),
        ('/api/stats', 'GET'),
        
        # POST端点测试
        ('/api/join', 'POST', {
            'name': '测试用户',
            'email': 'test@example.com',
            'university': '测试大学',
            'major': '计算机科学',
            'reason': '希望加入QHSF-HSD学习更多技术知识'
        }),
        ('/api/subscribe', 'POST', {
            'email': 'subscribe@example.com'
        }),
        ('/api/contact', 'POST', {
            'name': '测试联系人',
            'email': 'contact@example.com',
            'subject': '测试主题',
            'message': '这是一条测试消息'
        })
    ]
    
    # 执行测试
    passed = 0
    total = len(test_cases)
    
    for endpoint, method, *data in test_cases:
        test_data = data[0] if data else None
        if test_api_endpoint(endpoint, method, test_data):
            passed += 1
    
    # 测试结果
    print(f"\n{'='*50}")
    print(f"测试完成!")
    print(f"通过: {passed}/{total}")
    print(f"成功率: {passed/total*100:.1f}%")
    
    if passed == total:
        print("🎉 所有API测试通过!")
    else:
        print(f"⚠️  有 {total-passed} 个测试失败")

if __name__ == '__main__':
    main()