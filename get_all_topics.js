async function loadHandler() {
  if (await doRedirect()) {
    return;
  }
  const response = await apiGet('get_all_topics');
  const topicsContainer = document.getElementById('topics-container');
  for (const topic of response.topics) {
    const topicDiv = document.createElement('div');
    const link = document.createElement('a');
    link.innerText = topic.title;
    link.href = '/topic.html?' + topic.id;
    topicDiv.appendChild(link);
    for (const subtopic of topic.topics) {
      const subtopicDiv = document.createElement('div');
      const link = document.createElement('a');
      link.innerText = subtopic.title;
      link.href = '/topic.html?' + subtopic.id;
      subtopicDiv.style.paddingLeft = '16px';
      subtopicDiv.appendChild(link);
      topicDiv.appendChild(subtopicDiv);
    }
    topicsContainer.appendChild(topicDiv);
  }
}
window.onload = loadHandler;