import sys
import argparse
import requests
import json
import os

def get_posts(args):
    try:
        res = requests.get('https://jsonplaceholder.typicode.com/posts')
        if res.status_code != 200:
            print('Get posts fail')
            return None
        result = json.loads(res.text)
        length = len(result)
        start = args.start
        if start is not None:
            if start - 1 < length and start > 0:
                result = result[start - 1:length]

        if args.end is not None:
            if args.end - 1 < length and args.end > 0:
                result = result[0:args.end] if start is None else result[0:args.end - start + 1]

        if args.output is not None:
            with open(args.output, 'w+') as file:
                content = json.dumps(result, indent=2, separators=(',', ':'))
                file.write(content)
        # print(result)
        return result
    except RuntimeError as err:
        print(err)
        print("Unknown Exception")

def add_params():
    parser = argparse.ArgumentParser(description="A command-line tool in Python that retrieves posts")
    parser.add_argument("--start", help="optional argument specifies beginning of posts range to output default 0", dest="start",type=int)
    parser.add_argument("--end", help="optional argument specifies end of posts range default size( posts returned )", dest="end",type=int)
    parser.add_argument("--out", help="optional argument specifies name of file to output default stdout", dest="output", type=str)
    args=parser.parse_args()
    return get_posts(args)

if __name__=="__main__":
	result = add_params()
	print(result)
	input('Press ENTER to exit...')