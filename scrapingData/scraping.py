from requests_html import HTMLSession
import os
import sys

writeFileName = "courseLinks.out"
writeFileStream = open(writeFileName,'w',encoding='utf-8')

session = HTMLSession()
url = 'https://www.ji.sjtu.edu.cn/academics/courses/courses-by-number/'
r = session.get(url)


for i in range(2,100):
    sel = '#Faculty-information > li:nth-child(' + str(i) + ') > a'
    # print(sel)
    results = r.html.find(sel)
    if len(results) == 0:
        break;
    else:
        for result in results:
            writeFileStream.write(result.absolute_links.pop()+'\n')

writeFileStream.close()


# #Faculty-information > li:nth-child(3) > a
