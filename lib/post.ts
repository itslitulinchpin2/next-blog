import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(),'posts')
console.log('process.cwd()',process.cwd())
//현 폴더의 경로가 찍힘
console.log('postsDirectory',postsDirectory)

export function getSortedPostsData(){
    //posts 파일 이름 잡아주기
    const fileNames = fs.readdirSync(postsDirectory);
    console.log('fileNames', fileNames)
    //['pre-rendering.md', ...]


    const allPostsData = fileNames.map(fileName =>{
        
        //.md를 없애줌
        const id = fileName.replace(/\.md$/, '')

        //상세파일 경로까지 fullPath에 추가함
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...(matterResult.data as {date:string; title: string})
        }
    })
    return allPostsData.sort((a,b)=>{
        if(a.date<b.date){
            return 1
        } else {
            return -1
        }
    })

}