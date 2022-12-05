import useDemo from '@/store/demo/hook'
import { Button } from 'antd'

export default function DemoPage() {
  const { num, countPlusOne, countMinusOne, countPlusOneAsync } = useDemo()

  return (
    <div className='demo-page-container'>
      <Button className='add_btn' onClick={countPlusOne}>
        +
      </Button>
      <Button className='dec_btn' onClick={countMinusOne}>
        -
      </Button>
      <Button className='dec_btn' onClick={countPlusOneAsync}>
        async
      </Button>
      <div>
        <span>{num}</span>
      </div>
      <div>
        <span>Hello, World</span>
      </div>
    </div>
  )
}
