import sys
import unittest
import get_post
import argparse
import json
import os

class MockArgs:
    def __init__(self, start = None, end = None, output = None):
        self.start = start
        self.end = end
        self.output = output

class TestGetPost(unittest.TestCase):
    def test_get_with_no_param(self):
        args = MockArgs()
        result = get_post.get_posts(args)
        self.assertEqual(len(result), 100)

    def test_get_with_start(self):
        args = MockArgs(5)
        result = get_post.get_posts(args)
        self.assertEqual(len(result), 96)

    def test_get_with_end(self):
        args = MockArgs(None, 20)
        result = get_post.get_posts(args)
        self.assertEqual(len(result), 20)

    def test_get_with_start_and_end(self):
        args = MockArgs(5, 20)
        result = get_post.get_posts(args)
        self.assertEqual(len(result), 16)

    def test_get_with_output(self):
        args = MockArgs(None, None, 'test')
        get_post.get_posts(args)
        ifExist = os.path.exists('test')
        self.assertEqual(ifExist, True)
        os.remove("test")

if __name__ == '__main__':
    unittest.main()