import { TabWindowRenderer } from './tab-window-renderer'
import { Task } from '../commons/interfaces'

export class TabController {
  //Attributi
  private _currentTab: number = 0
  private _selectedTaskId: string = ''
  private _selectedTask: Task
  
  constructor(private tabs: Tab[], public tasks?: Task) {
    this.currentTab = 0
  }

  get currentTab () {return this._currentTab}
  set currentTab (tabNumber: number) {
    if(tabNumber >= 0 && tabNumber < this.tabs.length){
      this._currentTab = tabNumber
  
      TabWindowRenderer.updateNav(this.tabs.reduce((tabButtons, tab, tabId) => {
        tabButtons.push({
          name: tab.name,
          icon: tab.icon,
          action: () => {
            this.currentTab = tabId
          }
        })
        return tabButtons
      }, []), this._currentTab)
      TabWindowRenderer.updateMenu(this.tabs[this._currentTab].menuItems)
      TabWindowRenderer.updateView(this.tabs[this._currentTab].view())
    }
  }

  get selectedTask () {return this._selectedTask}
  set selectedTask (task: Task) {
    if(task != null) {
      this._selectedTask = task

      const properties: Property<string>[] = []
      properties.push({
        name: 'title',
        description: 'title text',
        value: task.title
      })
      properties.push({
        name: 'description',
        description: 'description text',
        value: task.description
      })
      properties.push({
        name: 'start date',
        description: 'project\'s start date' ,
        value: task.start_date
      })
      properties.push({
        name: 'end date',
        description: 'project\'s end date' ,
        value: task.end_date
      })
      TabWindowRenderer.updatePropertiesPanel(properties)
    }
  }

}
