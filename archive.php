<?php
/**
 * Category Template
 *
 * @package PitPay
 */

$category     = get_queried_object();
$args = array(
	'taxonomy'   => 'faq-category',
	'hide_empty' => false,
	'parent'     => $category->term_id,
);

$termchildren = new WP_Term_Query( $args );

function get_faq_posts( $term_id ) {
	$args = array(
		'post_type' => 'faqs',
		'orderby'   => 'menu_order',
		'order'     => 'ASC',
		'tax_query' => array(
			array(
				'taxonomy' => 'faq-category',
				'field'    => 'term_id',
				'terms'    => $term_id,
			),
		),
	);
	return new WP_Query( $args );
}

if ( $category->parent || empty( $termchildren->get_terms() ) ) {
	$query = get_faq_posts( $category->term_id );
}

get_header(); ?>
	<main id="primary" class="site__main site-main archive">
		<div id="index">
			<div class="archive-wrapper">
				<div class="archive-title-mobile">
					<a href="<?php echo esc_url( $category->parent ? esc_url( get_category_link( $category->parent ) ) : get_home_url() ); ?>" class="back-button-link">
					<div class="back-button">
						<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4.93949 7.4915L0 12.5994L1.73419 14.25L8.25 7.49163L1.73419 0.75L0 2.40065L4.93949 7.4915Z" />
						</svg>
					</div>
					</a>
					<div class="archive-title-mobile-name">
						<?php if ( ! $category->parent ) { ?>
						<div class="archive-image">
							<?php $image_url = z_taxonomy_image_url( $category->term_id ); ?>
							<img src="<?php echo esc_url( $image_url ); ?>" alt = 'Picture' />
						</div>
						<?php } ?>
						<h1>
							<?php single_cat_title(); ?>
						</h1>
					</div>
				</div>
				<div class="breadcrumbs">
					<div class="breadcrumbs-wrapper">
						<a href="<?php echo esc_url( get_home_url() ); ?>" class="breadcrumb-root">Support</a>
						<?php if ( $category->parent ) : ?>
							<p class="breadcrumb-divider"> / </p>
							<a href="<?php echo esc_url( get_category_link( $category->parent ) ); ?>" class="breadcrumb-root">
								<?php echo esc_html( get_the_category_by_ID( $category->parent ) ); ?>
							</a>
						<?php endif; ?>
						<p class="breadcrumb-divider"> / </p>
						<h3><?php single_cat_title(); ?></h3>
					</div>
				</div>
				<div class="home-categories">
					<ul>
						<?php foreach ( $termchildren->get_terms() as $term ) { ?>
							<li>
								<a href="<?php echo esc_url( get_category_link( $term->term_id ) ); ?>">
									<p><?php echo esc_html( $term->name ); ?></p>
									<div class="home-category-button">
										<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M4.93949 7.4915L0 12.5994L1.73419 14.25L8.25 7.49163L1.73419 0.75L0 2.40065L4.93949 7.4915Z" />
										</svg>
									</div>
								</a>
							</li>
						<?php } ?>
					</ul>
				</div>
			</div>
			<div class="archive-categories">
				<div class="archive-categories-title">
					<div class="archive-categories-title-wrapper">
						<?php if ( ! $category->parent ) { ?>
						<div class="archive-image">
							<?php $image_url = z_taxonomy_image_url( $category->term_id ); ?>
							<img src="<?php echo esc_url( $image_url ); ?>" alt = 'Picture' />
						</div>
						<?php } ?>
						<h1><?php single_cat_title(); ?></h1>
					</div>
				</div>
				<div class="archive-category-items">
					<div class="archive-category-items-wrapper">
						<?php foreach ( $termchildren->get_terms() as $term ) : ?>
							<?php
							$children = get_terms(
								$term->taxonomy,
								array(
									'parent'     => $term->term_id,
									'hide_empty' => false,
								)
							);
							?>
							<?php if ( ! empty( $children ) ) : ?>
								<div class="archive-category-item">
									<p><?php echo esc_html( $term->name ); ?></p>
									<?php foreach ( $children as $child_term ) { ?>
										<a href="<?php echo esc_url( get_term_link( $child_term->term_id ) ); ?>">
											<?php echo esc_html( $child_term->name ); ?>
										</a>
									<?php } ?>
								</div>
							<?php endif; ?>
							<?php if ( empty( $children ) ) : ?>
								<?php $faqs = get_faq_posts( $term->term_id ); ?>
								<div class="archive-category-item">
									<p><?php echo esc_html( $term->name ); ?></p>
									<?php foreach ( $faqs->posts as $faq ) { ?>
										<a href="<?php echo esc_url( get_the_permalink( $faq->ID ) ); ?>">
											<?php echo esc_html( $faq->post_title ); ?>
										</a>
									<?php } ?>
								</div>
							<?php endif; ?>
						<?php endforeach; ?>
						<?php if ( empty( $termchildren->get_terms() ) ) : ?>
							<?php $single_faqs = get_faq_posts( get_queried_object()->term_id ); ?>
							<div class="archive-category-item archive-category-item-child-term">
								<?php foreach ( $single_faqs->posts as $faq ) { ?>
									<a href="<?php echo esc_url( get_the_permalink( $faq->ID ) ); ?>">
										<?php echo esc_html( $faq->post_title ); ?>
									</a>
								<?php } ?>
							</div>
						<?php endif; ?>
					</div>
				</div>
			</div>
			<?php if ( isset( $query ) ) : ?>
			<div class="home-categories">
				<ul>
					<?php while ( $query->have_posts() ) : $query->the_post(); ?>
						<li>
							<a href="<?php echo esc_url( get_the_permalink( get_the_ID() ) ); ?>">
								<p class="home-categories-name"><?php the_title(); ?></p>
								<div class="home-category-button">
									<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M4.93949 7.4915L0 12.5994L1.73419 14.25L8.25 7.49163L1.73419 0.75L0 2.40065L4.93949 7.4915Z" />
									</svg>
								</div>
							</a>
						</li>
					<?php endwhile; ?>
				</ul>
			</div>
			<?php endif; ?>
		</div>
	</main>
<?php
get_footer();
