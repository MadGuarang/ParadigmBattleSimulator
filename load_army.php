<?php
$data = json_decode(file_get_contents('php://input'), true);
if ($data) {
    $file = 'armies.js';
    $content = file_get_contents($file);
    preg_match('/const\s+' . $data['name'] . '\s+=\s+(\[.*\]);/', $content, $matches);
    if (isset($matches[1])) {
        $army = json_decode($matches[1], true);
        echo json_encode(['success' => true, 'army' => $army]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>
