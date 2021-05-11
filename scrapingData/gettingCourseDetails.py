# INPUT: the course urls
# OUTPUT: course id, course name, pre-requisites... together in a csv file
from requests_html import HTMLSession
import os
import sys
session = HTMLSession()

writeFileName = "courseDetails.csv"
writeFileStream = open(writeFileName,'w',encoding='utf-8')
readFileName = 'courseLinks.out'
readFileStream = open(readFileName, 'r', encoding='utf-8')


selector_courseName = '#et-boc > div > div > div > div > div.et_pb_column.et_pb_column_3_4.et_pb_column_1.et_pb_specialty_column.et_pb_css_mix_blend_mode_passthrough.et-last-child > div.et_pb_row_inner.et_pb_row_inner_1 > div > div > div > h2'
selector_instructor = '#et-boc > div > div > div > div > div.et_pb_column.et_pb_column_3_4.et_pb_column_1.et_pb_specialty_column.et_pb_css_mix_blend_mode_passthrough.et-last-child > div.et_pb_row_inner.et_pb_row_inner_1 > div > div > div > p:nth-child(3)'
selector_credits = '#et-boc > div > div > div > div > div.et_pb_column.et_pb_column_3_4.et_pb_column_1.et_pb_specialty_column.et_pb_css_mix_blend_mode_passthrough.et-last-child > div.et_pb_row_inner.et_pb_row_inner_1 > div > div > div > p:nth-child(4)'
selector_prerequisite = '#et-boc > div > div > div > div > div.et_pb_column.et_pb_column_3_4.et_pb_column_1.et_pb_specialty_column.et_pb_css_mix_blend_mode_passthrough.et-last-child > div.et_pb_row_inner.et_pb_row_inner_1 > div > div > div > p:nth-child(5)'


def showText(r, selector):
    return (r.html.find(selector))[0].text


csvParser = '|'

def getCourseInfoStr(url):
    txt_detailedInfo = url
    r = session.get(url)
    txt_totalCourseName = showText(r, selector_courseName)
    print('Processing '+txt_totalCourseName+'...')
    for i in range(0,len(txt_totalCourseName)):
        if txt_totalCourseName[i] == '–': # Chinese —
            break
    txt_abbrCourseName = txt_totalCourseName[0:i-1]
    txt_detailedCourseName = txt_totalCourseName[i+2:len(txt_totalCourseName)]
    # print(txt_abbrCourseName)
    # print(txt_detailedCourseName)
    txt_instructor = (showText(r, selector_instructor))[12:len(showText(r, selector_instructor))]
    # print(txt_instructor)
    txt_credits = (showText(r, selector_credits))[9:10]
    # print(txt_credits)
    txt_prerequisite = (showText(r, selector_prerequisite))[16:len(showText(r, selector_prerequisite))]
    # print(txt_prerequisite)
    return (txt_abbrCourseName+csvParser+txt_detailedCourseName+csvParser+txt_instructor+csvParser+txt_credits+csvParser+txt_prerequisite+csvParser+txt_detailedInfo)
        

def main():
    for line in readFileStream:
        
        writeFileStream.write(getCourseInfoStr(line))

main()
# test('https://www.ji.sjtu.edu.cn/academics/courses/courses-by-number/course-info/?id=73')



