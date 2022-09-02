import {Card, Segmented } from 'antd'
import styles from './styles.module.scss'

const MiniStatistics = () => {
  return (
        <Card style={{ margin: '0 auto', width: '60%' }}>
        {/* <Segmented options={['Результат', 'Посмотреть слова']} value={value} onChange={(value) => changePage(value)} />
        {value === 'Результат' && <ResultCard />}
        {value === 'Посмотреть слова' && <LearnedWords />}
        <div>
          <button type="button" onClick={startNewGame}>Новая игра</button>
          <button type="button" onClick={redirectToTextbook}>Перейти в учебник</button>
        </div> */}
      </Card>
    )
}
export default MiniStatistics