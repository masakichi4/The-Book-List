# The Book List
The book list app is a personal project for searching New York Times bestsellers, saving them, and tagging the saved books. Before using, please get an API key from New York Times and plug it in. **Note** that this project is currently front-end only, and only stores results in memory. Refreshing the app deletes everything 'saved' in the app.

##### Run `npm install` to install packages.
##### Then run `npm start` to start the React app.
---
## Features & Screenshots
1. **Initial look**: After starting the app, there will be a search bar to enter keywords.
![initial image](/public/initial.png)
2. **Search Status**: The app will show a "Searching..." status after user types in a keyword in the bestseller's title and hit 'Enter' (or click the 'Search' button), before it displays results.
![searching image](/public/searching.png)
3. **Result Showing**: After receiving the results from New York Times API:
![result list image](/public/list.png)
4. **Dialog View**: Each result in the list opens as a dialog upon clicking. The dialog allows users to save the book and add tags to the book (only after saving it).
![result dialog image](/public/dialog.png)
5. **Error Handling**: If no results for the entered keywords can be retrieved or if the API call is unsuccessful, the app will display a "no results available" message.
![no results image](/public/noresults.png)
6. **Saving & Tagging**: The saved books will be displayed below the search bar. Users may save/unsave a book by clicking the bookmark icon at three places: in the result list, in an open dialog, and in the saved books section. Once saved, the icon will be filled green. Users may add up to three tags to each book. Tags that are too long may only show the full text when mouse hovered.
![saved books image](/public/saved.png)


----
Thank you for reading!❤️

